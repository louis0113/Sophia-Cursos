"use server";
import { User } from "@/models/User.model";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await User.findOne({
      where: { id: id },
    });
    return user;
  } catch {
    return null;
  }
};
