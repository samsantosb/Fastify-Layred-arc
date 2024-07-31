import { FastifyInstance, FastifyPluginOptions } from "fastify";
import userController from "../controllers/user.controller";
import { encryptPasswordMiddleware } from "../../auth/middlewares/encrypt.password.middleware";

export const userRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) => {
  fastify.post(
    "/register",
    { preHandler: [encryptPasswordMiddleware] },
    userController.create
  );
  fastify.put(
    "/users/:id",
    { preHandler: [encryptPasswordMiddleware] },
    userController.update
  );
  fastify.post(
    "/login",
    { preHandler: [encryptPasswordMiddleware] },
    userController.login
  );
  fastify.get("/users", userController.getAll);
  fastify.get("/users/:id", userController.getById);
  fastify.delete("/users/:id", userController.softDelete);
  done();
};
