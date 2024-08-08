import express from 'express';
import * as issueController from '../controllers/issueController';

const router = express.Router();

router.get('/', issueController.getIssues);
router.post('/', issueController.createIssue);
router.get('/:id', issueController.getIssueById);
router.put('/:id', issueController.updateIssue);
router.delete('/:id', issueController.deleteIssue);

export default router;