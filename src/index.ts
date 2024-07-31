import dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyRequest } from "fastify";
import { mongoConnect, mongoDisconnect } from "./database/mongoose-connect";
import { userRoutes } from "./modules/users/routes/user.route";
import { postRoutes } from "./modules/posts/routes/post.route";
import { ratingRoutes } from "./modules/ratings/routes/rating.route";

const fastify = Fastify({ logger: true });

mongoConnect();

fastify.register(userRoutes, { prefix: "/api/users" });
fastify.register(postRoutes, { prefix: "/api/posts" });
fastify.register(ratingRoutes, { prefix: "/api/ratings" });

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// server start function
const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0",
    });
    console.log(
      `Server running on http://localhost:${process.env.PORT || 3000}`
    );
  } catch (err) {
    fastify.log.error(err);
    await mongoDisconnect();
    process.exit(1);
  }
};

// server start
start();

// graceful shutdown
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
