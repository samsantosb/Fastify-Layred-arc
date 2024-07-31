"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPasswordMiddleware = void 0;
const auth_service_1 = require("../services/auth.service");
const status_code_1 = require("../../../shared/statusCode/status-code");
const zod_1 = require("zod");
const encryptPasswordMiddleware = async (request, reply) => {
    try {
        const { body: { password }, } = request;
        const parsedPassword = zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .parse(password);
        if (!password) {
            return reply.status(status_code_1.statusCode.BAD_REQUEST).send({
                message: "Password is required",
            });
        }
        request.body.password = await (0, auth_service_1.encryptPassword)(parsedPassword);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return handlePassowrdZodError(error, reply);
        }
        return reply.status(status_code_1.statusCode.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error",
        });
    }
};
exports.encryptPasswordMiddleware = encryptPasswordMiddleware;
function handlePassowrdZodError(error, reply) {
    return reply.status(status_code_1.statusCode.BAD_REQUEST).send({
        message: error.errors[0].message,
    });
}
