import {z} from 'zod';

import mongoose from 'mongoose';
import {postZodObject} from './create.schema';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const updateSchema = z
  .object({
    params: z.object({
      id: z.string().refine(isValidObjectId, {
        message: 'Invalid ObjectId',
      }),
    }),
    body: postZodObject,
  })
  .transform(data => ({...data.body, ...data.params}));
