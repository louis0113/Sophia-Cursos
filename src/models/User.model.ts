import { sequelize } from "@/database";
import bcrypt from "bcryptjs";
import { DataTypes, Model } from "sequelize";
import type {
  UserAttributes,
  UserCreationAttributes,
} from "@/types/User.types";

class UserCredentials
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
UserCredentials.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "UsersCredentials",
    hooks: {
      beforeCreate: async (user: UserCredentials): Promise<void> => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  },
);

export default UserCredentials;
