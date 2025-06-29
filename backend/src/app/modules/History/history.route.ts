import { Router } from 'express';
import { HistoryController } from './history.controller';
import { auth } from '../../middlewares';

const router = Router();

router.route('/').get(auth(), HistoryController.getHistories);

router
  .route('/:id')
  .patch(auth(), HistoryController.editHistory)
  .delete(HistoryController.deleteHistory);

export const HistoryRoutes = router;
