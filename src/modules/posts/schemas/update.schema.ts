import {z} from 'zod';
import {createSchema} from './create.schema';
import mongoose from 'mongoose';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const updateSchema = z
  .object({
    params: z.object({
      id: z.string().refine(isValidObjectId, {
        message: 'Invalid ObjectId',
      }),
    }),
    body: createSchema,
  })
  .transform(data => ({...data.body, ...data.params}));
