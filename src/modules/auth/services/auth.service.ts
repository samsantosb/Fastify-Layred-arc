import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretcode";

export const encryptPassword = async (password: unknown): Promise<string> => {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(String(password), SALT_ROUNDS);

  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  return isPasswordCorrect;
};

export const createJWT = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyJWT = (token: string): object | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as object;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export default {
  encryptPassword,
  comparePassword,
  createJWT,
  verifyJWT,
};
