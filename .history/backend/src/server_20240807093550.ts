import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import issueRoutes from './routes/issueRoutes';
import questionRoutes from './routes/questionRoutes';
import timerRoutes from './routes/timerRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
console.log('Setting up auth routes');
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/timers', timerRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/issac2')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;