import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import openAiController from '../controllers/openAi.controller.js';

const router = express.Router();

router.post('/ask', expressAsyncHandler(openAiController.ask));


export default router;