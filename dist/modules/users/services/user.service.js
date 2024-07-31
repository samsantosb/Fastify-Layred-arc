"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const return_patterns_1 = require("../../../shared/api-patterns/return-patterns");
const error_messages_1 = require("../../../shared/errorHandler/enums/error-messages");
const error_names_1 = require("../../../shared/errorHandler/enums/error-names");
const get_stack_trace_1 = require("../../../shared/errorHandler/stackTrace/get-stack-trace");
const auth_service_1 = __importDefault(require("../../auth/services/auth.service"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const login = async (user) => {
    const foundUser = await user_repository_1.default.getByEmail(user.email);
    if (!foundUser) {
        return (0, return_patterns_1.err)(error_messages_1.errorMessages.NOT_FOUND(`User - ${user.email}`), (0, get_stack_trace_1.getStackTrace)(), error_names_1.errorNames.NOT_FOUND);
    }
    const isAuthenticated = await auth_service_1.default.comparePassword(user.password, foundUser.password);
    if (!isAuthenticated) {
        return (0, return_patterns_1.err)(error_messages_1.errorMessages.INVALID_CREDENTIALS, (0, get_stack_trace_1.getStackTrace)(), error_names_1.errorNames.INTERNAL_SERVER_ERROR);
    }
    const { email, name } = foundUser;
    const token = auth_service_1.default.createJWT({ email, name });
    return (0, return_patterns_1.success)(token);
};
const getAll = async () => {
    const users = await user_repository_1.default.getAll();
    return (0, return_patterns_1.success)(users);
};
const getById = async (id) => {
    const user = await user_repository_1.default.getById(id);
    return (0, return_patterns_1.success)(user);
};
const create = async (user) => {
    const createdUser = await user_repository_1.default.create(user);
    if (!createdUser) {
        return (0, return_patterns_1.err)(error_messages_1.errorMessages.INTERNAL_SERVER_ERROR, (0, get_stack_trace_1.getStackTrace)(), error_names_1.errorNames.INTERNAL_SERVER_ERROR);
    }
    return (0, return_patterns_1.success)(createdUser);
};
const update = async (id, user) => {
    const updatedUser = await user_repository_1.default.update(id, user);
    if (!updatedUser) {
        return (0, return_patterns_1.err)(error_messages_1.errorMessages.INTERNAL_SERVER_ERROR, (0, get_stack_trace_1.getStackTrace)(), error_names_1.errorNames.CANNOT_UPDATE);
    }
    return (0, return_patterns_1.success)(updatedUser);
};
const softDelete = async (id) => {
    await user_repository_1.default.softDelete(id);
    return (0, return_patterns_1.success)(null);
};
exports.default = {
    login,
    getAll,
    getById,
    create,
    update,
    softDelete,
};
