import { FastifyInstance, FastifyPluginOptions } from "fastify";
import postController from "../controllers/post.controller";

export const postRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) => {
  fastify.get("/posts", postController.getAll);
  fastify.get("/posts/:id", postController.getById);
  fastify.post("/posts", postController.create);
  fastify.put("/posts/:id", postController.update);
  fastify.delete("/posts/:id", postController.softDelete);
  done();
};
