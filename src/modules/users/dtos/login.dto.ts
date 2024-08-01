import * as z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string(),
});

export function loginDTO(user: unknown) {
  const parsedUser = loginSchema.parse(user);

  return parsedUser;
}
