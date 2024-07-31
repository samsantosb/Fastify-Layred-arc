"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = require("../../../shared/errorHandler/error-handler");
const rating_service_1 = __importDefault(require("../services/rating.service"));
const status_code_1 = require("../../../shared/statusCode/status-code");
const rating_dto_1 = require("../dtos/rating.dto");
const mongoose_id_dto_1 = require("../../../shared/dtos/mongoose-id.dto");
const getAllByUserId = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err, ratings] = await rating_service_1.default.getAllByUserId(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(ratings);
};
const getAllByPostId = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err, rating] = await rating_service_1.default.getAllByPostId(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(rating);
};
const getById = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err, rating] = await rating_service_1.default.getById(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(rating);
};
const create = async (request, reply) => {
    const { body } = request;
    const ratingData = (0, rating_dto_1.ratingDTO)(body);
    const [err, rating] = await rating_service_1.default.create(ratingData);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.CREATED).send(rating);
};
const update = async (request, reply) => {
    const { params, body } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const rating = (0, rating_dto_1.ratingDTO)(body);
    const [err, updatedRating] = await rating_service_1.default.update(id, rating);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.OK).send(updatedRating);
};
const softDelete = async (request, reply) => {
    const { params } = request;
    const id = (0, mongoose_id_dto_1.mongooseIdDTO)(params);
    const [err] = await rating_service_1.default.softDelete(id);
    if (err) {
        const { errMessage, errStatusCode } = (0, error_handler_1.errorHandler)(err);
        return reply.status(errStatusCode).send({ message: errMessage });
    }
    return reply.status(status_code_1.statusCode.NO_CONTENT).send();
};
exports.default = {
    getAllByUserId,
    getAllByPostId,
    getById,
    create,
    update,
    softDelete,
};
