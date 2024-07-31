import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/errorHandler/enums/error-messages";
import { errorNames } from "../../../shared/errorHandler/enums/error-names";
import { getStackTrace } from "../../../shared/errorHandler/stackTrace/get-stack-trace";
import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";

const login = async (user: { email: string; password: string }) => {
  const foundUser = await userRepository.getByEmail(user.email);

  if (!foundUser) {
    return err(
      errorMessages.NOT_FOUND(`User - ${user.email}`),
      getStackTrace(),
      errorNames.NOT_FOUND
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    foundUser.password
  );

  if (!isPasswordCorrect) {
    return err(
      errorMessages.INVALID_CREDENTIALS,
      getStackTrace(),
      errorNames.INTERNAL_SERVER_ERROR
    );
  }

  const { email, name } = foundUser;

  return success({ email, name });
}

const getAll = async () => {
  const users = await userRepository.getAll();

  return success(users);
};

const getById = async (id: string) => {
  const user = await userRepository.getById(id);

  return success(user);
};

const create = async (user: {
  email: string;
  password: string;
  name: string;
}) => {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const createdUser = await userRepository.create({
    ...user,
    password: hashedPassword,
  });

  if (!createdUser) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.INTERNAL_SERVER_ERROR
    );
  }

  return success(createdUser);
};

const update = async (
  id: string,
  user: { email?: string; password?: string; name?: string }
) => {
  const updatedUser = await userRepository.update(id, user);

  if (!updatedUser) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.CANNOT_UPDATE
    );
  }

  return success(updatedUser);
};

const softDelete = async (id: string) => {
  await userRepository.softDelete(id);

  return success(null);
};

export default {
  login,
  getAll,
  getById,
  create,
  update,
  softDelete,
};
