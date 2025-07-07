import express from 'express';
import { startQuiz, getQuestion, submitAnswer, getStatus } from '../controllers/quiz.controller.js';

const router = express.Router();

// Defines API endpoints and maps them to controller functions 
router.get('/start', startQuiz); // [cite: 33]
router.get('/question/:step', getQuestion); // [cite: 33]
router.post('/answer', submitAnswer); // [cite: 33]
router.get('/status/:sessionId', getStatus); // [cite: 33]

export default router;