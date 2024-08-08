import { Request, Response } from 'express';
import Timer, { ITimer } from '../models/Timer';

export const getTimers = async (req: Request, res: Response): Promise<void> => {
  try {
    const timers: ITimer[] = await Timer.find();
    res.status(200).json(timers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timers', error });
  }
};

export const createTimer = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTimer: ITimer = new Timer(req.body);
    const savedTimer: ITimer = await newTimer.save();
    res.status(201).json(savedTimer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating timer', error });
  }
};

export const getTimerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const timer: ITimer | null = await Timer.findById(req.params.id);
    if (!timer) {
      res.status(404).json({ message: 'Timer not found' });
      return;
    }
    res.status(200).json(timer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timer', error });
  }
};

export const updateTimer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTimer: ITimer | null = await Timer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTimer) {
      res.status(404).json({ message: 'Timer not found' });
      return;
    }
    res.status(200).json(updatedTimer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating timer', error });
  }
};

export const deleteTimer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTimer: ITimer | null = await Timer.findByIdAndDelete(req.params.id);
    if (!deletedTimer) {
      res.status(404).json({ message: 'Timer not found' });
      return;
    }
    res.status(200).json({ message: 'Timer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting timer', error });
  }
};