"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorNames = void 0;
/**
 * Status names for various types of responses.
 * These names do not need to be exclusive to REST and can be used for WebSocket, GraphQL, etc.
 *
 * @constant
 * @readonly
 * @enum {string}
 */
exports.errorNames = {
    CANNOT_UPDATE: "CANNOT_UPDATE",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    BAD_REQUEST: "BAD_REQUEST",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    FORBIDDEN: "FORBIDDEN",
    CONFLICT: "CONFLICT",
    GONE: "GONE",
    PRECONDITION_FAILED: "PRECONDITION_FAILED",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
};
