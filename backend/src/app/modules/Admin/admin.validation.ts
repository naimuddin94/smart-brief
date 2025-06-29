import { z } from 'zod';
import { ROLE, TRole } from '../User/user.constant';

// MongoDB ObjectId validation regex
const objectIdRegex = /^[a-f\d]{24}$/i;

const changeRoleSchema = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a string',
      })
      .min(1, 'User ID cannot be empty')
      .refine((val) => objectIdRegex.test(val), {
        message: 'User ID must be a valid MongoDB ObjectId',
      }),

    role: z
      .enum(Object.values(ROLE) as [string, ...string[]], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be one of the predefined values',
      })
      .refine((val) => Object.values(ROLE).includes(val as TRole), {
        message: `Role must be one of: ${Object.values(ROLE).join(', ')}`,
      }),
  }),
});

const updateCreditsSchema = z.object({
  body: z.object({
    userId: z
      .string({
        required_error: 'User ID is required',
      })
      .refine((val) => objectIdRegex.test(val), {
        message: 'User ID must be a valid MongoDB ObjectId',
      }),

    credits: z.string().refine((val) => !isNaN(Number(val)), {
      message: 'Credits must be a numeric string',
    }),
  }),
});

export const AdminValidation = {
  changeRoleSchema,
  updateCreditsSchema,
};
