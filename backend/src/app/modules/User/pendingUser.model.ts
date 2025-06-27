import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IPendingUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';

const pendingUserSchema = new mongoose.Schema<IPendingUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide a full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
  },
  { timestamps: { createdAt: true } }
);

// Custom hooks/methods

// Modified password fields before save to database
pendingUserSchema.pre('save', async function (next) {
  try {
    // Check if the password is modified or this is a new user
    if (this.password && (this.isModified('password') || this.isNew)) {
      const hashPassword = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
      );
      this.password = hashPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

// For generating access token
pendingUserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    config.jwt_access_secret!,
    {
      expiresIn: config.jwt_access_expires_in as any,
    }
  );
};

// For generating refresh token
pendingUserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    config.jwt_refresh_secret!,
    {
      expiresIn: config.jwt_refresh_expires_in as any,
    }
  );
};

const PendingUser = mongoose.model<IPendingUser>(
  'PendingUser',
  pendingUserSchema
);

export default PendingUser;
