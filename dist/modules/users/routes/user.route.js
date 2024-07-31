"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const encrypt_password_middleware_1 = require("../../auth/middlewares/encrypt.password.middleware");
const userRoutes = (fastify, options, done) => {
    fastify.post("/register", { preHandler: [encrypt_password_middleware_1.encryptPasswordMiddleware] }, user_controller_1.default.create);
    fastify.put("/users/:id", { preHandler: [encrypt_password_middleware_1.encryptPasswordMiddleware] }, user_controller_1.default.update);
    fastify.post("/login", { preHandler: [encrypt_password_middleware_1.encryptPasswordMiddleware] }, user_controller_1.default.login);
    fastify.get("/users", user_controller_1.default.getAll);
    fastify.get("/users/:id", user_controller_1.default.getById);
    fastify.delete("/users/:id", user_controller_1.default.softDelete);
    done();
};
exports.userRoutes = userRoutes;
