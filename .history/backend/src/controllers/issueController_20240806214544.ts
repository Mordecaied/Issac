import { Request, Response } from 'express';
import Issue, { IIssue } from '../models/Issue';

export const getIssues = async (req: Request, res: Response): Promise<void> => {
  try {
    const issues: IIssue[] = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
};

export const createIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const newIssue: IIssue = new Issue({ title, description });
    const savedIssue: IIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ message: 'Error creating issue', error });
  }
};

// Add more controller functions for updating, deleting, and getting a single issue