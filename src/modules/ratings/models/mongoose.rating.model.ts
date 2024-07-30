import mongoose, { Document, Schema } from "mongoose";

interface mongooseRatingType extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  rating: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ratingSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const mongooseRating = mongoose.model<mongooseRatingType>(
  "Rating",
  ratingSchema
);
