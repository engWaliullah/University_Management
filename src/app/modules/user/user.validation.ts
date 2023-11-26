import { z } from 'zod';

const userZodSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Name must be a string' })
    .optional(),
});

export const userValidation = {
  userZodSchema,
};
