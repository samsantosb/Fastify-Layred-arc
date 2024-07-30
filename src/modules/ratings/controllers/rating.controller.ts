import { FastifyReply, FastifyRequest } from "fastify";
import { errorHandler } from "../../../shared/errorHandler/error-handler";
import ratingService from "../services/rating.service";
import { statusCode } from "../../../shared/statusCode/status-code";
import { ratingDTO } from "../dtos/rating.dto";
import { mongooseIdDTO } from "../../../shared/dtos/mongoose-id.dto";

const getAllByUserId = async (request: FastifyRequest, reply: FastifyReply) => {
  const { params } = request;

  const id = mongooseIdDTO(params);

  const [err, ratings] = await ratingService.getAllByUserId(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(ratings);
};

const getAllByPostId = async (request: FastifyRequest, reply: FastifyReply) => {
  const { params } = request;

  const id = mongooseIdDTO(params);

  const [err, rating] = await ratingService.getAllByPostId(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(rating);
};

const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { params } = request;

  const id = mongooseIdDTO(params);

  const [err, rating] = await ratingService.getById(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(rating);
}

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { body } = request;

  const ratingData = ratingDTO(body);

  const [err, rating] = await ratingService.create(ratingData);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.CREATED).send(rating);
};

const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { params, body } = request;

  const id = mongooseIdDTO(params);

  const rating = ratingDTO(body);

  const [err, updatedRating] = await ratingService.update(id, rating);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(updatedRating);
};

const softDelete = async (request: FastifyRequest, reply: FastifyReply) => {
  const { params } = request;

  const id = mongooseIdDTO(params);

  const [err] = await ratingService.softDelete(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.NO_CONTENT).send();
};

export default {
  getAllByUserId,
  getAllByPostId,
  getById,
  create,
  update,
  softDelete,
};