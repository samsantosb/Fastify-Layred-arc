import {z} from 'zod';

import mongoose from 'mongoose';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const updateSchema = z
  .object({
    params: z.object({
      id: z.string().refine(isValidObjectId, {
        message: 'Invalid ObjectId',
      }),
    }),
    body: z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      category: z.string().min(1, 'Category is required'),
      thumbnailUrl: z.string().min(1, 'Thumbnail URL is required').url('Invalid URL format'),
      contentUrl: z.string().min(1, 'Content URL is required').url('Invalid URL format'),
    }),
  })
  .transform(data => ({...data.body, ...data.params}));
