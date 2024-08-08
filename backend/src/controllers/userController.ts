import { Request, Response } from 'express';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    res.json({ user: { id: user?._id, username: user?.username, email: user?.email } });
  } catch (error) {
    console.error('Fetching profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};
