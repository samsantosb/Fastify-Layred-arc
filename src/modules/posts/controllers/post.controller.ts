import { FastifyReply, FastifyRequest } from "fastify";
import { errorHandler } from "../../../shared/errorHandler/error-handler";
import postService from "../services/post.service";
import { statusCode } from "../../../shared/statusCode/status-code";
import { postDTO } from "../dtos/post.dto";
import { mongooseIdDTO } from "../../../shared/dtos/mongoose-id.dto";
import { postUpdateDTO } from "../dtos/post-update.dto";

const getAll = async (
  request: FastifyRequest<{ Headers: { authorization: string } }>,
  reply: FastifyReply
) => {
  const [err, posts] = await postService.getAll();

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(posts);
};

const getById = async (
  request: FastifyRequest<{
    Params: { id: string };
    Headers: { authorization: string };
  }>,
  reply: FastifyReply
) => {
  const {
    params: { id },
  } = request;

  const validId = mongooseIdDTO(id);

  const [err, post] = await postService.getById(validId);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(post);
};

const create = async (
  request: FastifyRequest<{ Headers: { authorization: string } }>,
  reply: FastifyReply
) => {
  const { body } = request;

  const postData = postDTO(body);

  const [err, post] = await postService.create(postData);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.CREATED).send(post);
};

const update = async (
  request: FastifyRequest<{
    Params: { id: string };
    Headers: { authorization: string };
  }>,
  reply: FastifyReply
) => {
  const { params, body } = request;

  const validId = mongooseIdDTO(params.id);

  const post = postUpdateDTO(body);

  const [err, updatedPost] = await postService.update(validId, post);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(updatedPost);
};

const softDelete = async (
  request: FastifyRequest<{
    Params: { id: string };
    Headers: { authorization: string };
  }>,
  reply: FastifyReply
) => {
  const { params } = request;

  const validId = mongooseIdDTO(params.id);

  const [err] = await postService.softDelete(validId);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.NO_CONTENT).send();
};

export default {
  getAll,
  getById,
  create,
  update,
  softDelete,
};
