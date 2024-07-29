import { User } from "../models/domain.user.type";
import { mongooseUser } from "../models/mongoose.user.model";

const getUsers = async (): Promise<User[]> => {
  const users = await mongooseUser.find();

  return users.map(
    ({ _id, email, name, password, isDeleted, updatedAt, createdAt }) => ({
      id: String(_id),
      email,
      name,
      password,
      isDeleted,
      updatedAt,
      createdAt,
    })
  );
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await mongooseUser.findOne({ _id: id });

  if (!user) {
    return null;
  }

  const { _id, email, name, password, isDeleted, updatedAt, createdAt } = user;

  return {
    id: String(_id),
    email,
    name,
    password,
    isDeleted,
    updatedAt,
    createdAt,
  };
};

const createUser = async (user: {
  email: string;
  password: string;
  name: string;
}): Promise<User> => {
  const createdUser = await mongooseUser.create(user);
  return {
    id: String(createdUser._id),
    email: createdUser.email,
    name: createdUser.name,
    password: createdUser.password,
    isDeleted: createdUser.isDeleted,
    updatedAt: createdUser.updatedAt,
    createdAt: createdUser.createdAt,
  };
};

const updateUser = async (
  id: string,
  user: { email?: string; password?: string; name?: string }
): Promise<User | null> => {
  const updatedUser = await mongooseUser
    .findByIdAndUpdate(id, user, {
      new: true,
    })
    .exec();

  if (!updatedUser) {
    return null;
  }

  return {
    id: String(updatedUser._id),
    email: updatedUser.email,
    name: updatedUser.name,
    password: updatedUser.password,
    isDeleted: updatedUser.isDeleted,
    updatedAt: updatedUser.updatedAt,
    createdAt: updatedUser.createdAt,
  };
};

const softDeleteUser = async (id: string): Promise<User | null> => {
  const user = await mongooseUser
    .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .exec();

  if (!user) {
    return null;
  }

  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    password: user.password,
    isDeleted: user.isDeleted,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

export { getUsers, getUserById, createUser, updateUser, softDeleteUser };
