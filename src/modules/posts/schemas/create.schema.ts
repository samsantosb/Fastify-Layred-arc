import * as z from 'zod';

export const postZodObject = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  thumbnailUrl: z.string().min(1, 'Thumbnail URL is required').url('Invalid URL format'),
  contentUrl: z.string().min(1, 'Content URL is required').url('Invalid URL format'),
});

export const createSchema = z
  .object({
    body: postZodObject,
  })
  .transform(data => ({...data.body}));
