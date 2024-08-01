import { FastifyReply, FastifyRequest } from "fastify";
import { errorHandler } from "../../../shared/errorHandler/error-handler";
import ratingService from "../services/rating.service";
import { statusCode } from "../../../shared/statusCode/status-code";
import { ratingDTO } from "../dtos/rating.dto";
import { mongooseIdDTO } from "../../../shared/dtos/mongoose-id.dto";

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

  const [err, rating] = await ratingService.getById(validId);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(rating);
};

const create = async (
  request: FastifyRequest<{ Headers: { authorization: string } }>,
  reply: FastifyReply
) => {
  const { body } = request;

  const ratingData = ratingDTO(body);

  const [err, rating] = await ratingService.create(ratingData);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.CREATED).send(rating);
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

  const rating = ratingDTO(body);

  const [err, updatedRating] = await ratingService.update(validId, rating);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(updatedRating);
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

  const [err] = await ratingService.softDelete(validId);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.NO_CONTENT).send();
};

export default {
  getById,
  create,
  update,
  softDelete,
};
