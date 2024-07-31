import {z} from 'zod';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const envVariables = z.object({
  MONGO: z.string(),
  PORT: z.string().transform(Number),
  DEBUG_MODE: z.string().optional(),
});

/**
 * Validates the environment variables based on the zod defined schema.
 *
 * @throws Throws a ZodError if the validation fails.
 *
 */
export const validateEnv = () => {
  envVariables.parse(process.env);
};
