import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login, getCurrentUser } from './controllers/authController';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/issac2')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/user', authMiddleware, getCurrentUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;