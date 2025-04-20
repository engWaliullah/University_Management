import { z } from 'zod';
import { UserStatus } from './user.constant';

const userZodSchema = z.object({
  password: z.string({
    invalid_type_error: 'password must be a string',
  })
  .max(20, {message: "password must be less than 20 characters"}).optional(),


});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const userValidation = {
  userZodSchema,
  changeStatusValidationSchema
};
