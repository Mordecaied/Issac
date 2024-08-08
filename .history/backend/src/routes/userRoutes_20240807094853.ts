import express from 'express';
import { getUserProfile } from './controllers/userController.';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/profile', auth, getUserProfile);

export default router;