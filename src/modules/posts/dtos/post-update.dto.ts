import * as z from "zod";

const postUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  thumbnailUrl: z
    .string()
    .min(1, "Thumbnail URL is required")
    .url("Invalid URL format")
    .optional(),
  contentUrl: z
    .string()
    .min(1, "Content URL is required")
    .url("Invalid URL format")
    .optional(),
});

export function postUpdateDTO(post: unknown) {
  const parsedPost = postUpdateSchema.parse(post);

  return parsedPost;
}
