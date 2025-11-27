import { Model } from "sequelize";

export interface UserAttributes {
  id?: number;
  email?: string;
  name?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role: string;
}

export interface UserMethods {
  validatePassword(password: string): Promise<boolean>;
}

export class UserModel
  extends Model<UserAttributes>
  implements UserAttributes, UserMethods
{
  declare id?: number;
  declare email?: string;
  declare name?: string;
  declare emailVerified?: Date;
  declare image?: string;
  declare password?: string;
  declare role: string;

  validatePassword!: (password: string) => Promise<boolean>;
}
