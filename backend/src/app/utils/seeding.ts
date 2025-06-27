import config from '../config';
import { ROLE } from '../modules/Auth/auth.constant';
import Auth from '../modules/Auth/auth.model';
import { Logger } from './logger';

const seedingAdmin = async () => {
  try {
    // at first check if the admin exist of not
    const admin = await Auth.findOne({
      role: ROLE.ADMIN,
      email: config.super_admin.email,
    });
    if (!admin) {
      await Auth.create({
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
