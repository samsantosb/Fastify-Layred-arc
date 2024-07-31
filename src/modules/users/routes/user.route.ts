import { FastifyInstance, FastifyPluginOptions } from "fastify";
import userController from "../controllers/user.controller";
import { encryptPasswordMiddleware } from "../../auth/middlewares/encrypt.password.middleware";
import { authMiddleware } from "../../auth/middlewares/auth.middleware";

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
    "/:id",
    { preHandler: [encryptPasswordMiddleware] },
    userController.update
  );
  fastify.post("/login", {}, userController.login);
  fastify.get("/", { preHandler: [authMiddleware] }, userController.getAll);
  fastify.get("/:id", { preHandler: [authMiddleware] }, userController.getById);
  fastify.delete(
    "/:id",
    { preHandler: [authMiddleware] },
    userController.softDelete
  );
  done();
};
