import { FastifyInstance } from "fastify";
import userController from "../controllers/user.controller";

export const userRoutes = (fastify: FastifyInstance) => {
  fastify.post("/register", userController.create);
  fastify.post("/login", userController.login);
  fastify.get("/users", userController.getAll);
  fastify.get("/users/:id", userController.getById);
  fastify.put("/users/:id", userController.update);
  fastify.delete("/users/:id", userController.softDelete);
};
