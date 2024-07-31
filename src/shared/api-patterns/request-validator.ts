import * as z from 'zod';
import {err, success} from './return-patterns';
import {errorMessages} from '../errorHandler/enums/error-messages';
import {getStackTrace} from '../errorHandler/stackTrace/get-stack-trace';
import {errorNames} from '../errorHandler/enums/error-names';

type Err = [
  {
    message: string;
    stack: string;
    name: string;
  },
  null,
];

type Sucess<T extends z.ZodSchema> = [null, Required<z.infer<T>>];

export const validateRequest = <T extends z.ZodSchema>(
  data: unknown,
  schema: T,
): Err | Sucess<T> => {
  const validatedSchema = schema.safeParse(data);

  if (validatedSchema.error) {
    return err(
      errorMessages.BAD_REQUEST(validatedSchema.error.message),
      getStackTrace(),
      errorNames.BAD_REQUEST,
    );
  }

  return success(validatedSchema.data);
};
