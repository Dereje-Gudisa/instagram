import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 1. Check if Authorization header exists and starts with 'Bearer'
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      // 2. Extract token (Guaranteed to be a string!)
      const token = authHeader.split(' ')[1];

      if (!token) {
        res.status(401).json({ message: 'Not authorized, token missing' });
        return;
      }

      // 3. Secret string
      const secret = process.env.JWT_SECRET || 'fallback_secret';

      // 4. Verify token (Both token and secret are clean strings now!)
      const decoded = jwt.verify(token, secret) as JwtPayload;

      // 5. Find user in DB
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(401).json({ message: 'User no longer exists' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      res.status(401).json({ message: 'Not authorized, token invalid or expired' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};