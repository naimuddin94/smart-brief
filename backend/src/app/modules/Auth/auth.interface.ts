import { Document, Types } from 'mongoose';
import { TProvider, TRole } from './auth.constant';

export interface IAuth extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string | null;
  image: string | null;
  isSocialLogin: boolean;
  provider: TProvider | null;
  role: TRole;
  credits: number;
  lastActiveAt: Date;
  refreshToken: string | null;
  otp: string | null;
  otpExpiry: Date | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
