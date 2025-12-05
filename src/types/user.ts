import { Model } from "sequelize";

export interface UserAttributes {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string;
  declare name: string | null;
  declare email: string;
  declare emailVerified: Date | null;
  declare image: string | null;
  declare password: string | null;
  declare role: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
