import { Post } from "../models/domain.post.type";
import { mongoosePost } from "../models/mongoose.post.model";
import mongoose, { ObjectId } from "mongoose";

const getAll = async (): Promise<Post[]> => {
  const posts = await mongoosePost.find()

  return posts.map(
    ({
      _id,
      title,
      description,
      category,
      thumbnailUrl,
      contentUrl,
      isDeleted,
      updatedAt,
      createdAt,
    }) => ({
      id: String(_id),
      title,
      description,
      category,
      thumbnailUrl,
      contentUrl,
      isDeleted,
      updatedAt,
      createdAt,
    })
  );
};

const getById = async (id: string): Promise<Post | null> => {
  const post = await mongoosePost.findOne({ _id: id });

  if (!post) {
    return null;
  }

  const {
    _id,
    title,
    description,
    category,
    thumbnailUrl,
    contentUrl,
    isDeleted,
    updatedAt,
    createdAt,
  } = post;

  return {
    id: String(_id),
    title,
    description,
    category,
    thumbnailUrl,
    contentUrl,
    isDeleted,
    updatedAt,
    createdAt,
  };
};

const create = async (post: {
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  contentUrl: string;
}): Promise<Post | null> => {
  const createdPost = await mongoosePost.create(post);
  return {
    id: String(createdPost._id),
    title: createdPost.title,
    description: createdPost.description,
    category: createdPost.category,
    thumbnailUrl: createdPost.thumbnailUrl,
    contentUrl: createdPost.contentUrl,
    isDeleted: createdPost.isDeleted,
    updatedAt: createdPost.updatedAt,
    createdAt: createdPost.createdAt,
  };
};

const update = async (
  id: string,
  post: {
    title?: string;
    description?: string;
    category?: string;
    thumbnailUrl?: string;
    contentUrl?: string;
  }
): Promise<Post | null> => {
  const updatedPost = await mongoosePost
    .findByIdAndUpdate(id, post, {
      new: true,
    })
    .exec();

  if (!updatedPost) {
    return null;
  }

  return {
    id: String(updatedPost._id),
    title: updatedPost.title,
    description: updatedPost.description,
    category: updatedPost.category,
    thumbnailUrl: updatedPost.thumbnailUrl,
    contentUrl: updatedPost.contentUrl,
    isDeleted: updatedPost.isDeleted,
    updatedAt: updatedPost.updatedAt,
    createdAt: updatedPost.createdAt,
  };
};

const softDelete = async (id: string): Promise<Post | null> => {
  const deletedPost = await mongoosePost
    .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .exec();

  if (!deletedPost) {
    return null;
  }

  return {
    id: String(deletedPost._id),
    title: deletedPost.title,
    description: deletedPost.description,
    category: deletedPost.category,
    thumbnailUrl: deletedPost.thumbnailUrl,
    contentUrl: deletedPost.contentUrl,
    isDeleted: deletedPost.isDeleted,
    updatedAt: deletedPost.updatedAt,
    createdAt: deletedPost.createdAt,
  };
};

export default {
  getAll,
  getById,
  create,
  update,
  softDelete,
};