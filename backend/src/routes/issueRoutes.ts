import express from 'express';
import * as issueController from '../controllers/issueController';
import { issueValidator, validate } from '../middleware/validators';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', auth, issueController.getIssues);
router.post('/', auth, validate(issueValidator), issueController.createIssue);
router.get('/:id', auth, issueController.getIssueById);
router.put('/:id', auth, validate(issueValidator), issueController.updateIssue);
router.delete('/:id', auth, issueController.deleteIssue);

export default router;