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
    const newIssue: IIssue = new Issue(req.body);
    const savedIssue: IIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(400).json({ message: 'Error creating issue', error });
  }
};

export const getIssueById = async (req: Request, res: Response): Promise<void> => {
  try {
    const issue: IIssue | null = await Issue.findById(req.params.id);
    if (!issue) {
      res.status(404).json({ message: 'Issue not found' });
      return;
    }
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issue', error });
  }
};

export const updateIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedIssue: IIssue | null = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedIssue) {
      res.status(404).json({ message: 'Issue not found' });
      return;
    }
    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(400).json({ message: 'Error updating issue', error });
  }
};

export const deleteIssue = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedIssue: IIssue | null = await Issue.findByIdAndDelete(req.params.id);
    if (!deletedIssue) {
      res.status(404).json({ message: 'Issue not found' });
      return;
    }
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue', error });
  }
};