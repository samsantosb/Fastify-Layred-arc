import {z} from 'zod';
import {postSchema} from './create.schema';
import mongoose from 'mongoose';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const updateSchema = z
  .object({
    params: z.object({
      id: z.string().refine(isValidObjectId, {
        message: 'Invalid ObjectId',
      }),
    }),
    body: postSchema,
  })
  .transform(data => ({...data.body, ...data.params}));
