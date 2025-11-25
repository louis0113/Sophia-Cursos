"use server";

import { signIn, signOut } from "@/auth";

export const loginGithub = async () => {
  await signIn("github", { redirectTo: "/user-info" });
};
export const loginGoogle = async () => {
  await signIn("google", { redirectTo: "/user-info" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const signup = async () => {};
