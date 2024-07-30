import * as z from "zod";
import { mongooseIdDTO } from "../../../shared/dtos/mongoose-id.dto";

const ratingSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  post: z.string().refine(mongooseIdDTO, "Invalid post ID"),
  user: z.string().refine(mongooseIdDTO, "Invalid user ID"),
});

export function ratingDTO(rating: unknown) {
  const parsedRating = ratingSchema.parse(rating);

  return parsedRating;
}