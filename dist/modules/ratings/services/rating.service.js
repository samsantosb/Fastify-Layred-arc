"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const return_patterns_1 = require("../../../shared/api-patterns/return-patterns");
const error_messages_1 = require("../../../shared/errorHandler/enums/error-messages");
const error_names_1 = require("../../../shared/errorHandler/enums/error-names");
const get_stack_trace_1 = require("../../../shared/errorHandler/stackTrace/get-stack-trace");
const rating_repository_1 = __importDefault(require("../repositories/rating.repository"));
const getAllByUserId = async (userId) => {
    const ratings = await rating_repository_1.default.getAllByUserId(userId);
    return (0, return_patterns_1.success)(ratings);
};
const getAllByPostId = async (id) => {
    const rating = await rating_repository_1.default.getAllByPostId(id);
    return (0, return_patterns_1.success)(rating);
};
const getById = async (id) => {
    const rating = await rating_repository_1.default.getById(id);
    return (0, return_patterns_1.success)(rating);
};
const create = async (rating) => {
    const createdRating = await rating_repository_1.default.create(rating);
    return (0, return_patterns_1.success)(createdRating);
};
const update = async (id, rating) => {
    const updatedRating = await rating_repository_1.default.update(id, rating);
    if (!updatedRating) {
        return (0, return_patterns_1.err)(error_messages_1.errorMessages.INTERNAL_SERVER_ERROR, (0, get_stack_trace_1.getStackTrace)(), error_names_1.errorNames.CANNOT_UPDATE);
    }
    return (0, return_patterns_1.success)(updatedRating);
};
const softDelete = async (id) => {
    await rating_repository_1.default.softDelete(id);
    return (0, return_patterns_1.success)(null);
};
exports.default = {
    getAllByUserId,
    getAllByPostId,
    getById,
    create,
    update,
    softDelete,
};
