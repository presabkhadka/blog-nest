import * as z from 'zod';

const types = ['BLOG', 'ARTICLE', 'RANT'];

export const createContentValidator = z.object({
  name: z.string().min(1, 'Content name must be provided'),
  type: z.enum(types),
  authorId: z.string().min(1, 'author id must be provided').optional(),
});

export const updateContentValidator = z.object({
  id: z.uuid({ version: 'v4' }),
  name: z.string().min(1, 'Content name must be provided').optional(),
  type: z.enum(types).optional(),
});
