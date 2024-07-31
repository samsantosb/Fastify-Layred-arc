"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = errorHandlingMiddleware;
const error_handler_1 = require("../error-handler");
const zod_1 = require("zod");
const status_code_1 = require("../../statusCode/status-code");
async function errorHandlingMiddleware(error, request, reply) {
    if (error instanceof zod_1.ZodError) {
        reply
            .status(status_code_1.statusCode.BAD_REQUEST)
            .send({ message: JSON.parse(error.message)[0].message });
        return;
    }
    const { errStatusCode, errMessage } = (0, error_handler_1.errorHandler)(error);
    reply
        .status(errStatusCode || status_code_1.statusCode.INTERNAL_SERVER_ERROR)
        .send({ message: errMessage || "Internal server error" });
    if (process.env.DEBUG_MODE === "true") {
        console.error(error);
    }
}
