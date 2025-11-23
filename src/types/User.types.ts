import { Model, Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export interface UserCredentialsInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  validatePassword(password: string): Promise<boolean>;
}
