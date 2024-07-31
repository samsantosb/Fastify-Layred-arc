import {z} from 'zod';
import {postSchema} from './create.schema';

export const updateSchema = z
  .object({
    params: z.object({
      id: z.string(),
    }),
    body: postSchema,
  })
  .transform(data => ({...data.body, ...data.params}));
