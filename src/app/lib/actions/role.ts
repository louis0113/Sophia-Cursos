"use server";
import * as z from "zod";
import { sequelize as db } from "@/database";
import { SelectRole } from "@/schemas";
import { auth } from "@/auth";

export const Role = async (data: z.infer<typeof SelectRole>) => {
  const session = await auth();
  const validateFields = SelectRole.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid role" };
  }

  const { role } = validateFields.data;

  await db.model("user").update(
    { role: role },
    {
      where: {
        id: session?.user?.id,
      },
    },
  );

  return { success: "Role added successfully" };
};
