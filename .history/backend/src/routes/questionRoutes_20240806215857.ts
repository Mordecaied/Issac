import express from 'express';
import * as questionController from '../controllers/questionController';

const router = express.Router();

router.get('/', questionController.getQuestions);
router.post('/', questionController.createQuestion);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

export default router;