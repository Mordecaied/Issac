import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface MongoError extends Error {
  code?: number;
  keyPattern?: { [key: string]: any };
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const user: IUser = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
    res.status(201).json({ user, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        // Duplicate key error
        const field = Object.keys(mongoError.keyPattern || {})[0];
        res.status(400).json({ message: `Error: ${field} already exists.` });
      } else {
        console.error('Registration error:', error);
        res.status(400).json({ message: 'Error registering user', error: error.message });
      }
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log('Login attempt:', { emailOrUsername, password: '********' });
    
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    
    if (!user) {
      console.log('User not found');
      res.status(401).json({ message: 'Invalid login credentials' });
      return;
    }
    
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid login credentials' });
      return;
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
    res.json({ user, token });
  } catch (error: unknown) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
  }
};