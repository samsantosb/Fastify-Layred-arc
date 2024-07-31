import dotenv from "dotenv";
dotenv.config();
import cors from "@fastify/cors";
import Fastify from "fastify";
import { mongoConnect, mongoDisconnect } from "./database/mongoose-connect";
import { userRoutes } from "./modules/users/routes/user.route";
import { postRoutes } from "./modules/posts/routes/post.route";
import { ratingRoutes } from "./modules/ratings/routes/rating.route";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";

const fastify = Fastify({ logger: true });

mongoConnect();
fastify.register(cors);
fastify.register(fjwt, { secret: "supersecretcode" });
fastify.addHook("preHandler", (req, res, next) => {
  req.jwt = fastify.jwt;
  return next();
});

// cookies
fastify.register(fCookie, {
  secret: "some-secret-key",
  hook: "preHandler",
});

// routes
fastify.register(userRoutes);
fastify.register(postRoutes);
fastify.register(ratingRoutes);

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log(
      `Server running on http://localhost:${process.env.PORT || 3000}`
    );
  } catch (err) {
    fastify.log.error(err);
    await mongoDisconnect();
    process.exit(1);
  }
};

start();

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connection");
  await mongoDisconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing MongoDB connection");
  await mongoDisconnect();
  process.exit(0);
});
