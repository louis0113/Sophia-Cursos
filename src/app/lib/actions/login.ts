"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "../data/user";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, role } = validateFields.data;

  const user = await getUserByEmail(email);

  try {
    if (role === user?.role) {
      await signIn("credentials", {
        email,
        password,
        role,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
      return { success: "Login with success" };
    }

    return { error: "Invalid role" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
};
