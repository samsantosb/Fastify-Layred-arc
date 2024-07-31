"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify_1 = __importDefault(require("fastify"));
const mongoose_connect_1 = require("./database/mongoose-connect");
const user_route_1 = require("./modules/users/routes/user.route");
const post_route_1 = require("./modules/posts/routes/post.route");
const rating_route_1 = require("./modules/ratings/routes/rating.route");
const fastify = (0, fastify_1.default)({ logger: true });
(0, mongoose_connect_1.mongoConnect)();
fastify.register(user_route_1.userRoutes, { prefix: "/api/users" });
fastify.register(post_route_1.postRoutes, { prefix: "/api/posts" });
fastify.register(rating_route_1.ratingRoutes, { prefix: "/api/ratings" });
fastify.get("/", async (request, reply) => {
    return { hello: "world" };
});
// Função para iniciar o servidor
const start = async () => {
    try {
        await fastify.listen({
            port: Number(process.env.PORT) || 3000,
            host: "0.0.0.0",
        });
        console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    }
    catch (err) {
        fastify.log.error(err);
        await (0, mongoose_connect_1.mongoDisconnect)();
        process.exit(1);
    }
};
// Iniciar o servidor
start();
// Shutdown gracioso
process.on("SIGINT", async () => {
    console.log("SIGINT signal received: closing MongoDB connection");
    await (0, mongoose_connect_1.mongoDisconnect)();
    process.exit(0);
});
process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing MongoDB connection");
    await (0, mongoose_connect_1.mongoDisconnect)();
    process.exit(0);
});
