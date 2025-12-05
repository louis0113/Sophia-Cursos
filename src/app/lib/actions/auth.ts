"use server";

import { signIn, signOut } from "@/auth";
export const loginGithub = async () => {
  await signIn("github", { redirectTo: "/role" });
};
export const loginGoogle = async () => {
  await signIn("google", { redirectTo: "/role" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
