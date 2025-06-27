import jwt from 'jsonwebtoken';
import { generateOtp, verifyToken } from '../../lib';
import { IAuth } from './auth.interface';
import config from '../../config';
import { AppError, Logger, sendOtpEmail } from '../../utils';
import status from 'http-status';
import Auth from './auth.model';
import { AuthValidation, TOtpPayload, TRegisterPayload, TUpdatePayload } from './auth.validation';
import bcrypt from 'bcryptjs';
import { TSocialLoginPayload } from '../../types';
import fs from 'fs';
import { z } from 'zod';
import { Request } from 'express';
import { ROLE } from './auth.constant';

// Create a new account
const saveUserIntoDB = async (payload: TRegisterPayload) => {
  const existingUser = await Auth.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError(status.BAD_REQUEST, 'Email already exists');
  }

  const otp = generateOtp();
  await sendOtpEmail(payload.email, otp, payload.fullName);

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await Auth.create(payload);

  return null;
};

const verifyOtpIntoDB = async (payload: TOtpPayload) => {
  const user = await Auth.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not exists!');
  }

  if (!user?.otpExpiry) {
    throw new AppError(status.BAD_REQUEST, 'Otp does not exists in DB');
  }

  if (user?.otp != payload.otp) {
    throw new AppError(status.BAD_REQUEST, 'Invalid otp!');
  }

  if (Date.now() > new Date(user.otpExpiry).getTime()) {
    throw new AppError(
      status.BAD_REQUEST,
      'OTP has expired. Please request a new one.'
    );
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const data = await Auth.findByIdAndUpdate(user._id, {
    $set: { otp: null, otpExpiry: null, refreshToken, isVerified: true },
  }).select('name image email role');

  if (!data) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Something went wrong to verify user into db'
    );
  }

  return { ...data.toObject(), accessToken, refreshToken };
};

const resendOtpAgain = async (email: string) => {
  const user = await Auth.findOne({ email });

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'Account not exists!');
  }

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await sendOtpEmail(email, otp, user.name);

  const data = await Auth.findByIdAndUpdate(user._id, {
    $set: { otp, otpExpiry },
  });

  if (!data) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Something went wrong to verify user into db'
    );
  }

  return null;
};

// For signin
const signinIntoDB = async (req: Request) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not exists!');
  }

  if (user.isSocialLogin || !user?.password) {
    throw new AppError(
      status.BAD_REQUEST,
      'This account is registered via social login. Please sign in using your social account.'
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken,
  };
};

// Social signin service
const socialLoginServices = async (payload: TSocialLoginPayload) => {
  const { email, fcmToken, image, name, address } = payload;

  // Check if user exists
  const auth = await Auth.findOne({ email });

  if (!auth) {
    const authRes = await Auth.create({
      email,
      fcmToken,
      image,
      name: name,
      address,
      isSocialLogin: true,
      isVerified: true,
    });

    if (!authRes) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        'Fail to create user into database'
      );
    }

    const accessToken = authRes.generateAccessToken();
    const refreshToken = authRes.generateRefreshToken();

    await Auth.findByIdAndUpdate(authRes._id, { refreshToken });

    return {
      name: authRes.name,
      email: authRes.email,
      role: authRes.role,
      image: authRes.image,
      accessToken,
      refreshToken,
    };
  } else {
    const accessToken = auth.generateAccessToken();
    const refreshToken = auth.generateRefreshToken();

    auth.refreshToken = refreshToken;
    await auth.save({ validateBeforeSave: false });

    return {
      name: auth.name,
      email: auth.email,
      role: auth.role,
      image: auth.image,
      accessToken,
      refreshToken,
    };
  }
};

const signoutFromDB = async (user: IAuth) => {
  await Auth.findByIdAndUpdate(user._id, { $set: { refreshToken: null } });

  return null;
};

const updateProfileIntoDB = async (
  user: IAuth,
  payload: TUpdatePayload & { image: string },
  file: Express.Multer.File | undefined
) => {
  try {
    const auth = await Auth.findOne({
      _id: user._id,
      isVerified: true,
    });

    if (!auth) {
      throw new AppError(status.NOT_FOUND, 'User not exists!');
    }

    if (file?.path) {
      if (user?.image) {
        try {
          await fs.promises.unlink(user.image);
        } catch (error: unknown) {
          Logger.error('Error deleting old file:', error);
        }
      }

      payload.image = file.path;
    }

    return await Auth.findByIdAndUpdate(user._id, payload, {
      new: true,
    }).select('-password');
  } catch {
    if (file?.path) {
      try {
        await fs.promises.unlink(file.path);
      } catch (error: unknown) {
        Logger.error('Error deleting old file:', error);
      }
    }
  }
};

const updateProfilePhoto = async (
  user: IAuth,
  file: Express.Multer.File | undefined
) => {
  if (!file?.path) {
    throw new AppError(status.BAD_REQUEST, 'File is required');
  }

  // Delete the previous image if exists
  if (user?.image) {
    try {
      await fs.promises.unlink(user.image);
    } catch (error: unknown) {
      Logger.error('Error deleting old file:', error);
    }
  }

  const res = await Auth.findByIdAndUpdate(
    user._id,
    { image: file.path },
    { new: true }
  ).select('name email image role');

  return res;
};

const changePasswordIntoDB = async (
  requestedUser: IAuth,
  payload: z.infer<typeof AuthValidation.passwordChangeSchema.shape.body>
) => {
  const user = await Auth.findOne({
    _id: requestedUser._id,
    isVerified: true,
  }).select('+password');

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not exists');
  }

  if (user.isSocialLogin || !user?.password) {
    throw new AppError(
      status.BAD_REQUEST,
      'This account is registered via social login. You can not change your password.'
    );
  }

  const isCredentialsCorrect = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );

  if (!isCredentialsCorrect) {
    throw new AppError(status.UNAUTHORIZED, 'Current password is not correct');
  }

  user.password = payload.newPassword;
  await user.save();

  return null;
};

const forgotPassword = async (email: string) => {
  const user = await Auth.findOne({
    email,
    isVerified: true,
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  const otp = generateOtp();
  await user.save();
  await sendOtpEmail(email, otp, user.name || 'Guest');

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await Auth.findByIdAndUpdate(user._id, {
    $set: { otp, otpExpiry, refreshToken: null },
  });

  return { email };
};

const verifyOtpForForgetPassword = async (payload: {
  email: string;
  otp: string;
}) => {
  const user = await Auth.findOne({
    email: payload.email,
    isVerified: true,
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  // Check if the OTP matches
  if (user?.otp !== payload.otp || !user.otpExpiry) {
    throw new AppError(status.BAD_REQUEST, 'Invalid OTP');
  }

  // Check if OTP has expired
  if (Date.now() > new Date(user.otpExpiry).getTime()) {
    throw new AppError(status.BAD_REQUEST, 'OTP has expired');
  }

  const resetToken = jwt.sign(
    {
      email: user.email,
      isResetPassword: '1994',
    },
    config.jwt_access_secret!,
    {
      expiresIn: '5d',
    }
  );

  return { resetToken };
};

const resetPasswordIntoDB = async (resetToken: string, newPassword: string) => {
  const { email, isResetPassword } = (await verifyToken(resetToken)) as any;

  const user = await Auth.findOne({
    email,
    isVerified: true,
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  // Check if the OTP matches
  if (isResetPassword !== '1994') {
    throw new AppError(status.BAD_REQUEST, 'Invalid reset password token.');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Update the user's password
  user.password = newPassword;
  user.refreshToken = refreshToken;
  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken,
  };
};

const getProfileFromDB = async (user: IAuth) => {
  return user;
};

const getAdminDetails = async () => {
  return await Auth.findOne({ role: ROLE.ADMIN }).select(
    'name email image contact description address'
  );
};

export const AuthService = {
  saveUserIntoDB,
  verifyOtpIntoDB,
  resendOtpAgain,
  signinIntoDB,
  socialLoginServices,
  signoutFromDB,
  updateProfileIntoDB,
  updateProfilePhoto,
  changePasswordIntoDB,
  forgotPassword,
  verifyOtpForForgetPassword,
  resetPasswordIntoDB,
  getProfileFromDB,
  getAdminDetails,
};
