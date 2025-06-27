import status from 'http-status';
import { asyncHandler, AppResponse } from '../../utils';
import { SummarizeService } from './summarize.service';

const summarizeFile = asyncHandler(async (req, res) => {
  const result = await SummarizeService.summarizeFromFile(req.file!);

  res
    .status(status.OK)
    .json(
      new AppResponse(
        status.OK,
        result,
        result.cached
          ? 'Summary retrieved from cache'
          : 'Summary generated successfully'
      )
    );
});

export const SummarizeController = {
  summarizeFile,
};
