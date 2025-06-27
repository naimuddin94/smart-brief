import config from '../config';
import { ROLE } from '../modules/User/user.constant';
import User from '../modules/User/user.model';
import { Logger } from './logger';

const seedingAdmin = async () => {
  try {
    // at first check if the admin exist of not
    const admin = await User.findOne({
      role: ROLE.ADMIN,
      email: config.super_admin.email,
    });
    if (!admin) {
      await User.create({
        name: 'Admin',
        role: ROLE.ADMIN,
        email: config.super_admin.email,
        password: config.super_admin.password,
        isVerified: true,
      });
    }
  } catch {
    Logger.error('Error seeding admin');
  }
};

export default seedingAdmin;
