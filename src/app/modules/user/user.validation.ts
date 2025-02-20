import { z } from 'zod';

const userZodSchema = z.object({
  password: z.string({
    invalid_type_error: 'password must be a string',
  })
  .max(20, {message: "password must be less than 20 characters"}).optional(),


  // needPasswordChange: z.boolean().optional().default(true),
  // role: z.enum(['admin', 'student', 'faculty']),
  // status: z.enum(['in-progress', 'block']).default('in-progress'),
  // isDeleted: z.boolean().optional().default(false),


});

export const userValidation = {
  userZodSchema,
};
