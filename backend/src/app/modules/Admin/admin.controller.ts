import status from 'http-status';
import { asyncHandler, AppResponse } from '../../utils';
import { AdminService } from './admin.service';

const changeUserRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const result = await AdminService.changeUserRoleIntoDB(userId, role);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'User role updated successfully'));
});

const updateUserCredit = asyncHandler(async (req, res) => {
  const { userId, credits } = req.body;
  const result = await AdminService.updateCreditIntoDB(userId, credits);

  res
    .status(status.OK)
    .json(
      new AppResponse(status.OK, result, 'User credits updated successfully')
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const result = await AdminService.getAllUserFromDB(req.query);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Users retrieved successfully'));
});

export const AdminController = {
  changeUserRole,
  updateUserCredit,
  getAllUsers,
};
