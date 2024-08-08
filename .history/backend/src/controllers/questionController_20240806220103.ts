import { Request, Response } from 'express';
import Question, { IQuestion } from '../models/Question';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions: IQuestion[] = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const newQuestion: IQuestion = new Question(req.body);
    const savedQuestion: IQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: 'Error creating question', error });
  }
};

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const question: IQuestion | null = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error });
  }
};

export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedQuestion: IQuestion | null = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuestion) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: 'Error updating question', error });
  }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedQuestion: IQuestion | null = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error });
  }
};