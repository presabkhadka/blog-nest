import * as z from 'zod';

const roles = ['AUTHOR', 'NORMAL', 'ADMIN'];

export const userSignupValidator = z.object({
  firstname: z.string().min(1, 'firstname is required'),
  lastname: z.string().min(1, 'lastname is required'),
  email: z.email(),
  password: z.string().min(8).max(12),
  role: z.enum(roles),
});

export const userLoginValidator = z.object({
  email: z.email(),
  password: z.string().min(8).max(12),
});
