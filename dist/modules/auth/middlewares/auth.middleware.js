"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_service_1 = require("../services/auth.service");
const status_code_1 = require("../../../shared/statusCode/status-code");
const authMiddleware = async (request, reply, done) => {
    const { headers: { authorization }, } = request;
    const invalidAuthorization = !authorization || !authorization.startsWith("Bearer ");
    if (invalidAuthorization) {
        reply.status(status_code_1.statusCode.UNAUTHORIZED).send({ error: "Unauthorized" });
        return;
    }
    const token = authorization.split(" ")[1];
    const decoded = (0, auth_service_1.verifyJWT)(token);
    if (!decoded) {
        reply.status(status_code_1.statusCode.UNAUTHORIZED).send({ error: "Invalid token" });
        return;
    }
    done();
};
exports.authMiddleware = authMiddleware;
