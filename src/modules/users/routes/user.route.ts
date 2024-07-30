import { FastifyInstance } from "fastify";
import userController from "../controllers/user.controller";

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.get("/users", userController.getAll);
  fastify.get("/users/:id", userController.getById);
  fastify.post("/users", userController.create);
  fastify.put("/users/:id", userController.update);
  fastify.delete("/users/:id", userController.softDelete);
};
