"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = require("../../../shared/errorHandler/error-handler");
const post_service_1 = __importDefault(require("../services/post.service"));
const status_code_1 = require("../../../shared/statusCode/status-code");
const post_dto_1 = require("../dtos/post.dto");
const mongoose_id_dto_1 = require("../../../shared/dtos/mongoose-id.dto");
const getAll = async (request, reply) => {
    const [err, posts] = await post_service_1.default.getAll();
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(posts);
};
const getById = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err, post] = await post_service_1.default.getById(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(post);
};
const create = async (request, reply) => {
    const { body } = request;
    const postData = (0, post_dto_1.postDTO)(body);
    const [err, post] = await post_service_1.default.create(postData);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.CREATED).send(post);
};
const update = async (request, reply) => {
    const { params, body } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const post = (0, post_dto_1.postDTO)(body);
    const [err, updatedPost] = await post_service_1.default.update(id, post);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(updatedPost);
};
const softDelete = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err] = await post_service_1.default.softDelete(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.NO_CONTENT).send();
};
exports.default = {
    getAll,
    getById,
    create,
    update,
    softDelete,
};
