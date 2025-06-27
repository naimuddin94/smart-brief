import status from 'http-status';
import { AppError, Logger, sendOtpEmail } from '../../utils';
import User from './user.model';
import {
  TOtpPayload,
  TSigninPayload,
  TSignupPayload,
  TUpdatePayload,
} from './user.validation';
import { generateOtp } from '../../lib';
import PendingUser from './pendingUser.model';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';
import { TSocialLoginPayload } from '../../types';
import fs from 'fs';

const savePendingUserIntoDB = async (payload: TSignupPayload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError(status.BAD_REQUEST, 'Email already exists');
  }

  const otp = generateOtp();
  await sendOtpEmail(payload.email, otp, payload.fullName);

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await PendingUser.findOneAndUpdate(
    { email: payload.email },
    { ...payload, otp, otpExpiry },
    { upsert: true, runValidators: true }
  );

  return null;
};

const verifyOtpAndSaveUserIntoDB = async (payload: TOtpPayload) => {
  const pendingUser = await PendingUser.findOne({ email: payload.email });

  if (!pendingUser) {
    throw new AppError(status.NOT_FOUND, 'User not exists!');
  }

  if (!pendingUser?.otpExpiry) {
    throw new AppError(status.BAD_REQUEST, 'Otp does not exists in DB');
  }

  if (pendingUser?.otp != payload.otp) {
    throw new AppError(status.BAD_REQUEST, 'Invalid otp!');
  }

  if (Date.now() > new Date(pendingUser.otpExpiry).getTime()) {
    throw new AppError(
      status.BAD_REQUEST,
      'OTP has expired. Please request a new one.'
    );
  }

  const accessToken = pendingUser.generateAccessToken();
  const refreshToken = pendingUser.generateRefreshToken();

  const { fullName, email, password } = pendingUser;

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    await User.create([{ fullName, email, password }], {
      session,
    });
    await PendingUser.findOneAndDelete({ email }, { session });

    await session.commitTransaction();

    return { accessToken, refreshToken, fullName, email };
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      error?.message || 'Something went wrong creating new account'
    );
  } finally {
    await session.endSession();
  }
};

const resendOtpAgain = async (email: string) => {
  const user = await PendingUser.findOne({ email });

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'Account not exists!');
  }

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await sendOtpEmail(email, otp, user.fullName);

  const data = await PendingUser.findByIdAndUpdate(user._id, {
    $set: { otp, otpExpiry },
  });

  if (!data) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Something went wrong save new otp into db'
    );
  }

  return null;
};

const signinIntoDB = async (payload: TSigninPayload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email }).select('+password');

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
    fullName: user.fullName,
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
  const auth = await User.findOne({ email });

  if (!auth) {
    const authRes = await User.create({
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

    await User.findByIdAndUpdate(authRes._id, { refreshToken });

    return {
      fullName: authRes.fullName,
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
      fullName: auth.fullName,
      email: auth.email,
      role: auth.role,
      image: auth.image,
      accessToken,
      refreshToken,
    };
  }
};

const signoutFromDB = async (user: IUser) => {
  await User.findByIdAndUpdate(user._id, { $set: { refreshToken: null } });
  return null;
};

const updateProfileIntoDB = async (
  user: IUser,
  payload: TUpdatePayload & { image: string },
  file: Express.Multer.File | undefined
) => {
  const oldImagePath = user.image;
  const newImagePath = file?.path;

  const auth = await User.findOne({
    _id: user._id,
    isVerified: true,
  });

  if (!auth) {
    if (newImagePath) await safeUnlink(newImagePath);
    throw new AppError(status.NOT_FOUND, 'User not exists!');
  }

  if (newImagePath) {
    payload.image = newImagePath;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, payload, {
      new: true,
    }).select('-password');

    if (newImagePath && oldImagePath) {
      await safeUnlink(oldImagePath); // cleanup old image after successful update
    }

    return updatedUser;
  } catch (error) {
    if (newImagePath) await safeUnlink(newImagePath); // rollback new upload
    Logger.error('Error updating profile:', error);
    throw error;
  }
};

const safeUnlink = async (filePath: string) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    Logger.error(`Failed to delete file ${filePath}:`, error);
  }
};

export const UserValidation = {
  savePendingUserIntoDB,
  verifyOtpAndSaveUserIntoDB,
  resendOtpAgain,
  signinIntoDB,
  socialLoginServices,
  signoutFromDB,
  updateProfileIntoDB,
};
