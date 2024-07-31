"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const return_patterns_1 = require("../../../shared/api-patterns/return-patterns");
const error_messages_1 = require("../../../shared/errorHandler/enums/error-messages");
const error_names_1 = require("../../../shared/errorHandler/enums/error-names");
const get_stack_trace_1 = require("../../../shared/errorHandler/stackTrace/get-stack-trace");
const post_repository_1 = __importDefault(require("../repositories/post.repository"));
const getAll = async () => {
    const posts = await post_repository_1.default.getAll();
    return (0, return_patterns_1.success)(posts);
};
const getById = async (id) => {
    const post = await post_repository_1.default.getById(id);
    return (0, return_patterns_1.success)(post);
};
const create = async (post) => {
    const createdPost = await post_repository_1.default.create(post);
    return (0, return_patterns_1.success)(createdPost);
};
const update = async (id, post) => {
    const updatedPost = await post_repository_1.default.update(id, post);
    if (!updatedPost) {
        return (0, return_patterns_1.err)(error_messages_1.errorMessages.INTERNAL_SERVER_ERROR, (0, get_stack_trace_1.getStackTrace)(), error_names_1.errorNames.CANNOT_UPDATE);
    }
    return (0, return_patterns_1.success)(updatedPost);
};
const softDelete = async (id) => {
    await post_repository_1.default.softDelete(id);
    return (0, return_patterns_1.success)(null);
};
exports.default = {
    getAll,
    getById,
    create,
    update,
    softDelete,
};
