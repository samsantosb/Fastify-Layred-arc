import dotenv from 'dotenv';
dotenv.config();
import cors from '@fastify/cors';
import Fastify from 'fastify';
import {mongoConnect, mongoDisconnect} from './database/mongoose-connect';
import {userRoutes} from './modules/users/routes/user.route';
import {postRoutes} from './modules/posts/routes/post.route';
import {ratingRoutes} from './modules/ratings/routes/rating.route';
import {validateEnv} from './shared/envt';
import {ZodError} from 'zod';
import {match, P} from 'ts-pattern';

const fastify = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

mongoConnect();
fastify.register(cors);
fastify.register(userRoutes);
fastify.register(postRoutes);
fastify.register(ratingRoutes);

fastify.get('/', async (request, reply) => {
  return {hello: 'world'};
});

function handleError(err: unknown) {
  match(err)
    .with(P.instanceOf(ZodError), zodErr => {
      const customErrors = zodErr.errors.map(e => ({
        erro: `env ${e.path.join('.')} nao encontrado`,
      }));
      fastify.log.error(
        `Erro de validacao de variaveis de ambiente: ${customErrors
          .map(error => error.erro)
          .join(', ')}`,
      );
    })
    .with(P.instanceOf(Error), error => {
      fastify.log.error(`Erro da api: ${error.message}`);
    })
    .otherwise(error => {
      fastify.log.error(`Erro desconhecido: ${error}`);
    });

  process.exit(1);
}

const start = async () => {
  try {
    validateEnv();
    await fastify.listen({port: process.env.PORT});
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    handleError(err);
    await mongoDisconnect();
    process.exit(1);
  }
};

start();

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing MongoDB connection');
  await mongoDisconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing MongoDB connection');
  await mongoDisconnect();
  process.exit(0);
});
