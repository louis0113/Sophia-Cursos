"use server";
import * as z from "zod";
import { User } from "@/models/User.model";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/app/lib/data/user";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { username, email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  await User.create({
    name: username,
    email: email,
    password: password,
    role: "teste",
  });

  return { success: "User created!" };
};
