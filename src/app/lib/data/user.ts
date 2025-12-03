import { sequelize } from "@/auth";
import { UserAttributes } from "@/types/user";

export async function getUserByEmail(
  email: string,
): Promise<UserAttributes | null> {
  try {
    const user = await sequelize.model("user").findOne({
      where: { email },
    });

    if (!user) return null;

    return user.get({ plain: true }) as UserAttributes;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

export async function getUserById(id: string): Promise<UserAttributes | null> {
  try {
    const user = await sequelize.model("user").findOne({
      where: { id },
    });

    if (!user) return null;

    return user.get({ plain: true }) as UserAttributes;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
}
