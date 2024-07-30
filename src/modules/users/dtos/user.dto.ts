import * as z from "zod";

const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().min(1, "Name is required"),
});

export function userDTO(user: unknown) {
  const parsedUser = userSchema.parse(user);

  return parsedUser;
}
