"use server";

import { sequelize as db } from "@/database";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.model("user").findOne({
      where: { email: email },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.model("user").findOne({
      where: { id: id },
    });
    return user;
  } catch {
    return null;
  }
};
