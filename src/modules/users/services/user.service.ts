import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/errorHandler/enums/error-messages";
import { errorNames } from "../../../shared/errorHandler/enums/error-names";
import { getStackTrace } from "../../../shared/errorHandler/stackTrace/get-stack-trace";
import userRepository from "../repositories/user.repository";

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
  const createdUser = await userRepository.create(user);

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
  getAll,
  getById,
  create,
  update,
  softDelete,
};
