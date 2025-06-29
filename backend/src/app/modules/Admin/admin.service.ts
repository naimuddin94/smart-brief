import status from 'http-status';
import { AppError } from '../../utils';
import { TRole } from '../User/user.constant';
import User from '../User/user.model';
import QueryBuilder from 'mongoose-query-builders';

export const getUserOrThrow = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User does not exist!');
  }
  return user;
};

const changeUserRoleIntoDB = async (userId: string, role: TRole) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    await getUserOrThrow(userId);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to update user role.'
    );
  }

  return updatedUser;
};

const updateCreditIntoDB = async (userId: string, credits: string) => {
  const creditValue = Number(credits);
  if (isNaN(creditValue)) {
    throw new AppError(status.BAD_REQUEST, 'Invalid credit amount.');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $inc: { credits: creditValue } },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    await getUserOrThrow(userId);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to update user credits.'
    );
  }

  return updatedUser;
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(['fullName', 'role', 'email'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const AdminService = {
  changeUserRoleIntoDB,
  updateCreditIntoDB,
  getAllUserFromDB,
};
