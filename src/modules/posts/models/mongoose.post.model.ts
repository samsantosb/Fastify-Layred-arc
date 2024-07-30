import mongoose, { Document, Schema } from "mongoose";

interface mongoosePostType extends Document {
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  contentUrl: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    contentUrl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const mongoosePost = mongoose.model<mongoosePostType>(
  "Post",
  postSchema
);
