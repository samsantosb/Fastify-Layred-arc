"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const postRoutes = (fastify, options, done) => {
    fastify.get("/posts", post_controller_1.default.getAll);
    fastify.get("/posts/:id", post_controller_1.default.getById);
    fastify.post("/posts", post_controller_1.default.create);
    fastify.put("/posts/:id", post_controller_1.default.update);
    fastify.delete("/posts/:id", post_controller_1.default.softDelete);
    done();
};
exports.postRoutes = postRoutes;
