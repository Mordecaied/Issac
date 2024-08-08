import express from 'express';
import * as issueController from '../controllers/issueController';

const router = express.Router();

router.get('/', issueController.getIssues);
router.post('/', issueController.createIssue);

// Add more routes for updating, deleting, and getting a single issue

export default router;