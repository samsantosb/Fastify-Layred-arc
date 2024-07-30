import { ObjectId } from "mongoose";
import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/errorHandler/enums/error-messages";
import { errorNames } from "../../../shared/errorHandler/enums/error-names";
import { getStackTrace } from "../../../shared/errorHandler/stackTrace/get-stack-trace";
import postRepository from "../repositories/post.repository";

const getAll = async () => {
  const posts = await postRepository.getAll();

  return success(posts);
};

const getById = async (id: string) => {
  const post = await postRepository.getById(id);

  return success(post);
};

const create = async (post: {
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  contentUrl: string;
}) => {
  const createdPost = await postRepository.create(post);

  return success(createdPost);
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
) => {
  const updatedPost = await postRepository.update(id, post);

  if (!updatedPost) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.CANNOT_UPDATE
    );
  }

  return success(updatedPost);
};

const softDelete = async (id: string) => {
  await postRepository.softDelete(id);

  return success(null);
};

export default {
  getAll,
  getById,
  create,
  update,
  softDelete,
};