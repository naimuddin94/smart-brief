import express from 'express';
import { SummarizeController } from './summarize.controller';
import { upload } from '../../lib';

const router = express.Router();

router
  .route('/')
  .post(upload.single('file'), SummarizeController.summarizeFile);

export const SummarizeRoutes = router;
