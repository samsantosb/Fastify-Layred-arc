import * as z from "zod";
import { err, success } from "../api-patterns/return-patterns";
import { errorMessages } from "../errorHandler/enums/error-messages";
import { errorNames } from "../errorHandler/enums/error-names";
import mongoose from "mongoose";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

const objectIdSchema = z.string().refine(isValidObjectId, {
  message: "Invalid ObjectId",
});

export function mongooseIdDTO(id: unknown) {
  const parsed = objectIdSchema.parse(id);

  return parsed;
}
