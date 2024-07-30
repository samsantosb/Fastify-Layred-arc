import * as z from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});

export function userDTO(user: unknown) {
  const parsedUser = userSchema.parse(user);

  return parsedUser;
}
