"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = require("../../../shared/errorHandler/error-handler");
const user_service_1 = __importDefault(require("../services/user.service"));
const status_code_1 = require("../../../shared/statusCode/status-code");
const user_dto_1 = require("../dtos/user.dto");
const mongoose_id_dto_1 = require("../../../shared/dtos/mongoose-id.dto");
const login = async (request, reply) => {
    const { body } = request;
    const { email, password } = (0, user_dto_1.userDTO)(body);
    const [err, token] = await user_service_1.default.login({ email, password });
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send({ token });
};
const getAll = async (request, reply) => {
    const [err, users] = await user_service_1.default.getAll();
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(users);
};
const getById = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err, user] = await user_service_1.default.getById(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(user);
};
const create = async (request, reply) => {
    const { body } = request;
    const userData = (0, user_dto_1.userDTO)(body);
    const [err, user] = await user_service_1.default.create(userData);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.CREATED).send(user);
};
const update = async (request, reply) => {
    const { params, body } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const user = (0, user_dto_1.userDTO)(body);
    const [err, updatedUser] = await user_service_1.default.update(id, user);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(updatedUser);
};
const softDelete = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err] = await user_service_1.default.softDelete(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.NO_CONTENT).send();
};
exports.default = {
    login,
    getAll,
    getById,
    create,
    update,
    softDelete,
};
