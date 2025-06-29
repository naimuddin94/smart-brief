import status from 'http-status';
import { AppError } from '../../utils';
import History from './history.model';
import { IHistory } from './history.interface';
import { IUser } from '../User/user.interface';
import QueryBuilder from 'mongoose-query-builders';
import { ROLE } from '../User/user.constant';
import { FilterQuery } from 'mongoose';

const getAllHistoriesFromDB = async (
  user: IUser,
  query: Record<string, unknown>
) => {
  const mongoQuery: FilterQuery<IHistory> = {};

  if (user?.role === ROLE.USER) {
    mongoQuery.user = user._id;
  }

  const queryBuilder = new QueryBuilder(
    History.find(mongoQuery).populate({
      path: 'user',
      select: 'fullName email credits createdAt',
    }),
    query
  )
    .search(['summary', 'tags'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    data: result,
  };
};

const editHistoryByIdFromDB = async (
  user: IUser,
  historyId: string,
  payload: Partial<IHistory>
) => {
  const mongoQuery: FilterQuery<IHistory> = { _id: historyId };

  if (user?.role !== ROLE.ADMIN && user?.role !== ROLE.EDITOR) {
    mongoQuery.user = user._id;
  }

  const updatedData = await History.findOneAndUpdate(mongoQuery, payload, {
    new: true,
  });

  if (!updatedData) {
    throw new AppError(status.NOT_FOUND, 'History not found!');
  }

  return updatedData;
};

const deleteHistoryByIdFromDB = async (user: IUser, historyId: string) => {
  const mongoQuery: FilterQuery<IHistory> = { _id: historyId };

  if (user?.role !== ROLE.ADMIN && user?.role !== ROLE.EDITOR) {
    mongoQuery.user = user._id;
  }

  const deleted = await History.findOneAndDelete(mongoQuery);

  if (!deleted) {
    throw new AppError(
      status.NOT_FOUND,
      'History not found or already deleted.'
    );
  }

  return deleted;
};

export const HistoryService = {
  getAllHistoriesFromDB,
  editHistoryByIdFromDB,
  deleteHistoryByIdFromDB,
};
