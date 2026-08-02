import type { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';


//  Register a new user
//  @route   POST /api/auth/register

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: 'Username, email, and password are required' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        res.status(400).json({ message: 'Email is already registered' });
        return;
      }
      res.status(400).json({ message: 'Username is already taken' });
      return;
    }

    // Hash password and save user
    const passwordHash = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      passwordHash,
      fullName: fullName || '',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePicUrl: user.profilePicUrl,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

//  Login user & return token
//  POST /api/auth/login

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { credential, password } = req.body; // Accepts email or username

    if (!credential || !password) {
      res.status(400).json({ message: 'Credential and password are required' });
      return;
    }

    const normalizedCredential = credential.toLowerCase();
    
    // Explicitly select passwordHash because select: false in schema
    const user = await User.findOne({
      $or: [{ email: normalizedCredential }, { username: normalizedCredential }],
    }).select('+passwordHash');

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePicUrl: user.profilePicUrl,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};