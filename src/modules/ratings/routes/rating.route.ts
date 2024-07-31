import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ratingController from "../controllers/rating.controller";
import { authMiddleware } from "../../auth/middlewares/auth.middleware";

export const ratingRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) => {
  fastify.get(
    "/:id",
    { preHandler: [authMiddleware] },
    ratingController.getById
  );
  fastify.post("/", { preHandler: [authMiddleware] }, ratingController.create);
  fastify.put("/:id", { preHandler: [authMiddleware] }, ratingController.update);
  fastify.delete("/:id", { preHandler: [authMiddleware] }, ratingController.softDelete);
  done();
};
