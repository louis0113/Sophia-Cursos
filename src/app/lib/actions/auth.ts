"use server";

import { signIn, signOut } from "@/auth";

export const loginGithub = async () => {
  await signIn("github", { redirectTo: "/api/user-info" });
};
export const loginGoogle = async () => {
  await signIn("google", { redirectTo: "/api/user-info" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
