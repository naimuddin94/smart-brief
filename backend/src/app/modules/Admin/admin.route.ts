import { Router } from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import { auth, validateRequest } from '../../middlewares';
import { ROLE } from '../User/user.constant';

const router = Router();

router
  .route('/change-role')
  .patch(
    auth(ROLE.ADMIN),
    validateRequest(AdminValidation.changeRoleSchema),
    AdminController.changeUserRole
  );

router
  .route('/update-credits')
  .patch(
    auth(ROLE.ADMIN),
    validateRequest(AdminValidation.updateCreditsSchema),
    AdminController.updateUserCredit
  );

router.route('/users').get(auth(ROLE.ADMIN), AdminController.getAllUsers);

export const AdminRoutes = router;
