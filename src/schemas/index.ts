import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  role: z
    .enum(["aluno", "instrutor"], {
      message: "Role is required",
    })
    .optional(),
});

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  role: z.enum(["aluno", "instrutor"], {
    message: "Role is required",
  }),
});
