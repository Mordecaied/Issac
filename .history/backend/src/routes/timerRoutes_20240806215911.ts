import express from 'express';
import * as timerController from '../controllers/timerController';

const router = express.Router();

router.get('/', timerController.getTimers);
router.post('/', timerController.createTimer);
router.get('/:id', timerController.getTimerById);
router.put('/:id', timerController.updateTimer);
router.delete('/:id', timerController.deleteTimer);

export default router;