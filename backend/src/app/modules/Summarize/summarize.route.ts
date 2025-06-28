import express from 'express';
import { SummarizeController } from './summarize.controller';
import { upload } from '../../lib';
import { auth } from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .post(auth(), SummarizeController.summarizeFile);

export const SummarizeRoutes = router;
