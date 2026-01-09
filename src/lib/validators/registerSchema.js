import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters"),

    email: z.string().email("Please enter a valid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirm_password: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
