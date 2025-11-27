import { sequelize } from "@/database";
import bcrypt from "bcryptjs";
import { DataTypes } from "sequelize";
import { UserModel } from "@/types//User.types";

export const User = sequelize.define<UserModel>(
  "User",
  {
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user: UserModel): Promise<void> => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: UserModel): Promise<void> => {
        if (user.changed("password") && user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

UserModel.prototype.validatePassword = async function (
  password: string,
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};
