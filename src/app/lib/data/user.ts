"use server";
import UserCredentials from "@/models/User.model";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserCredentials.findOne({
      where: { email: email },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await UserCredentials.findOne({
      where: { id: id },
    });
    return user;
  } catch {
    return null;
  }
};
