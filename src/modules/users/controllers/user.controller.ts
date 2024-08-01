import { FastifyReply, FastifyRequest } from "fastify";
import { errorHandler } from "../../../shared/errorHandler/error-handler";
import userService from "../services/user.service";
import { statusCode } from "../../../shared/statusCode/status-code";
import { userDTO } from "../dtos/user.dto";
import { mongooseIdDTO } from "../../../shared/dtos/mongoose-id.dto";
import { loginDTO } from "../dtos/login.dto";

const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { body } = request;

  const { email, password } = loginDTO(body);

  const [err, token] = await userService.login({ email, password });

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send({ token });
};

const getAll = async (
  request: FastifyRequest<{ Headers: { authorization: string } }>,
  reply: FastifyReply
) => {
  const [err, users] = await userService.getAll();

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(users);
};

const getById = async (
  request: FastifyRequest<{ Headers: { authorization: string } }>,
  reply: FastifyReply
) => {
  const { params } = request;

  const id = mongooseIdDTO(params);

  const [err, user] = await userService.getById(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(user);
};

const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { body } = request;

  const userData = userDTO(body);

  const [err, user] = await userService.create(userData);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.CREATED).send(user);
};

const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { params, body } = request;

  const id = mongooseIdDTO(params);

  const user = userDTO(body);

  const [err, updatedUser] = await userService.update(id, user);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.OK).send(updatedUser);
};

const softDelete = async (
  request: FastifyRequest<{ Headers: { authorization: string } }>,
  reply: FastifyReply
) => {
  const { params } = request;

  const id = mongooseIdDTO(params);

  const [err] = await userService.softDelete(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return reply.status(errStatusCode).send({ message: errMessage });
  }

  return reply.status(statusCode.NO_CONTENT).send();
};

export default {
  login,
  getAll,
  getById,
  create,
  update,
  softDelete,
};
