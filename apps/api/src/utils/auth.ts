import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

// 1. Hash Raw Password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// 2. Compare Password with Stored Hash
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// 3. Generate Signed JWT Token
export const generateToken = (userId: Types.ObjectId): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  const expiresInValue = process.env.JWT_EXPIRES_IN ?? '7d';
  
  const options: SignOptions = { expiresIn: expiresInValue as NonNullable<SignOptions['expiresIn']> }

  return jwt.sign({ id: userId.toString() }, secret, options);
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};