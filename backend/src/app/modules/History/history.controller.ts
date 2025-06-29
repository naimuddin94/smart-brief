import status from 'http-status';
import { asyncHandler, AppResponse } from '../../utils';
import { HistoryService } from './history.service';

const getHistories = asyncHandler(async (req, res) => {
  const result = await HistoryService.getAllHistoriesFromDB(
    req.user,
    req.query
  );

  res
    .status(status.OK)
    .json(
      new AppResponse(
        status.OK,
        result.data,
        'Histories retrieved successfully',
        result.meta
      )
    );
});

const editHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await HistoryService.editHistoryByIdFromDB(
    req.user,
    id,
    req.body
  );

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'History updated successfully'));
});

const deleteHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await HistoryService.deleteHistoryByIdFromDB(req.user, id);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'History deleted successfully'));
});

export const HistoryController = {
  getHistories,
  editHistory,
  deleteHistory,
};
