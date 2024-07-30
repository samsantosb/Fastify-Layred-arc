import dotenv from "dotenv";
dotenv.config();
import cors from "@fastify/cors";
import Fastify from "fastify";
import { mongoConnect, mongoDisconnect } from "./database/mongoose-connect";
import { userRoutes } from "./modules/users/routes/user.route";

const fastify = Fastify({ logger: true });

mongoConnect();
fastify.register(cors);
fastify.register(userRoutes);

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
