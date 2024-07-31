import {FastifyReply, FastifyRequest} from 'fastify';
import {errorHandler} from '../../../shared/errorHandler/error-handler';
import postService from '../services/post.service';
import {statusCode} from '../../../shared/statusCode/status-code';
import {mongooseIdDTO} from '../../../shared/dtos/mongoose-id.dto';

const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const [err, posts] = await postService.getAll();

  if (err) {
    const {errMessage, errStatusCode} = errorHandler(err);

    return reply.status(errStatusCode).send({message: errMessage});
  }

  return reply.status(statusCode.OK).send(posts);
};

const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const {params} = request;

  const id = mongooseIdDTO(params);

  const [err, post] = await postService.getById(id);

  if (err) {
    const {errMessage, errStatusCode} = errorHandler(err);

    return reply.status(errStatusCode).send({message: errMessage});
  }

  return reply.status(statusCode.OK).send(post);
};

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const [err, post] = await postService.create(request);

  if (err) {
    const {errMessage, errStatusCode} = errorHandler(err);

    return reply.status(errStatusCode).send({message: errMessage});
  }

  return reply.status(statusCode.CREATED).send(post);
};

const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const [err, updatedPost] = await postService.update(request);

  if (err) {
    const {errMessage, errStatusCode} = errorHandler(err);

    return reply.status(errStatusCode).send({message: errMessage});
  }

  return reply.status(statusCode.OK).send(updatedPost);
};

const softDelete = async (request: FastifyRequest, reply: FastifyReply) => {
  const {params} = request;

  const id = mongooseIdDTO(params);

  const [err] = await postService.softDelete(id);

  if (err) {
    const {errMessage, errStatusCode} = errorHandler(err);

    return reply.status(errStatusCode).send({message: errMessage});
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
