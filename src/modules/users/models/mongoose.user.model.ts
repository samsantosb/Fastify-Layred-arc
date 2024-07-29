import mongoose, { Document, Schema } from "mongoose";

interface mongooseUserType extends Document {
  email: string;
  password: string;
  name: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const mongooseUser = mongoose.model<mongooseUserType>(
  "User",
  userSchema
);
