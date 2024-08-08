import { body, ValidationChain } from 'express-validator';

export const issueValidator: ValidationChain[] = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('status').isIn(['open', 'in-progress', 'closed']).withMessage('Invalid status'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Invalid date format')
];

export const questionValidator: ValidationChain[] = [
  body('content').notEmpty().withMessage('Question content is required'),
  body('answer').notEmpty().withMessage('Answer is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level')
];

export const timerValidator: ValidationChain[] = [
  body('name').notEmpty().withMessage('Timer name is required'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('category').notEmpty().withMessage('Category is required')
];

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};