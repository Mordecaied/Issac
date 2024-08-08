import express from 'express';
import { register, login } from '../controllers/authController';
import { body } from 'express-validator';
import { validate } from '../middleware/validators';

const router = express.Router();

const registerValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidator = [
  body('emailOrUsername').notEmpty().withMessage('Email or username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

router.post('/register', validate(registerValidator), register);
router.post('/login', validate(loginValidator), login);

export default router;