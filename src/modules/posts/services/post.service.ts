import {validateRequest} from '../../../shared/api-patterns/request-validator';
import {err, success} from '../../../shared/api-patterns/return-patterns';
import {errorMessages} from '../../../shared/errorHandler/enums/error-messages';
import {errorNames} from '../../../shared/errorHandler/enums/error-names';
import {getStackTrace} from '../../../shared/errorHandler/stackTrace/get-stack-trace';
import postRepository from '../repositories/post.repository';
import {createSchema} from '../schemas/create.schema';
import {updateSchema} from '../schemas/update.schema';

const getAll = async () => {
  const posts = await postRepository.getAll();

  return success(posts);
};

const getById = async (id: string) => {
  const post = await postRepository.getById(id);

  return success(post);
};

const create = async (payload: unknown) => {
  const [schemaErr, post] = validateRequest(payload, createSchema);

  if (schemaErr) return [schemaErr, null];

  const createdPost = await postRepository.create(post);

  return success(createdPost);
};

const update = async (payload: unknown) => {
  const [schemaErr, post] = validateRequest(payload, updateSchema);

  if (schemaErr) return [schemaErr, null];

  const updatedPost = await postRepository.update(post);

  if (!updatedPost) {
    return err(errorMessages.INTERNAL_SERVER_ERROR, getStackTrace(), errorNames.CANNOT_UPDATE);
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
