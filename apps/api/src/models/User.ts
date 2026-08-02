import { Schema, model, Document, Types } from 'mongoose';

// 1. Interface representing a User Document
export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  fullName?: string;
  bio?: string;
  profilePicUrl?: string;
  isPrivate: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// 2. Mongoose Schema definition
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [/^[a-zA-Z0-9_.]+$/, 'Username can only contain letters, numbers, underscores, and dots'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false, // Prevents returning password hashes in queries by default
    },
    fullName: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      maxlength: [150, 'Bio cannot exceed 150 characters'],
      default: '',
    },
    profilePicUrl: {
      type: String,
      default: '',
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export const User = model<IUser>('User', userSchema);