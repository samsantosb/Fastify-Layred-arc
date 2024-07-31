import { FastifyInstance, FastifyPluginOptions } from "fastify";
import ratingController from "../controllers/rating.controller";

export const ratingRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) => {
  fastify.get("/ratings/:id", ratingController.getById);
  fastify.get("/ratings/user/:id", ratingController.getAllByUserId);
  fastify.get("/ratings/post/:id", ratingController.getAllByPostId);
  fastify.post("/ratings", ratingController.create);
  fastify.put("/ratings/:id", ratingController.update);
  fastify.delete("/ratings/:id", ratingController.softDelete);
  done();
};
