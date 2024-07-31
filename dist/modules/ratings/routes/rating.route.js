"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoutes = void 0;
const rating_controller_1 = __importDefault(require("../controllers/rating.controller"));
const ratingRoutes = (fastify, options, done) => {
    fastify.get("/ratings/:id", rating_controller_1.default.getById);
    fastify.get("/ratings/user/:id", rating_controller_1.default.getAllByUserId);
    fastify.get("/ratings/post/:id", rating_controller_1.default.getAllByPostId);
    fastify.post("/ratings", rating_controller_1.default.create);
    fastify.put("/ratings/:id", rating_controller_1.default.update);
    fastify.delete("/ratings/:id", rating_controller_1.default.softDelete);
    done();
};
exports.ratingRoutes = ratingRoutes;
