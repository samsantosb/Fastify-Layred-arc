import { FastifyInstance, FastifyPluginOptions } from "fastify";
import postController from "../controllers/post.controller";
import { authMiddleware } from "../../auth/middlewares/auth.middleware";

export const postRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) => {
  fastify.get("/", { preHandler: [authMiddleware] }, postController.getAll);
  fastify.get("/:id", { preHandler: [authMiddleware] }, postController.getById);
  fastify.post("/", { preHandler: [authMiddleware] }, postController.create);
  fastify.put("/:id", { preHandler: [authMiddleware] }, postController.update);
  fastify.delete("/:id", { preHandler: [authMiddleware] }, postController.softDelete);
  done();
};
