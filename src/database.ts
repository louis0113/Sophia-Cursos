import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const pass = process.env.DATABASE_PASS as string;
const user = process.env.DATABASE_USER as string;
const database = process.env.DATABASE_NAME as string;

export const sequelize = new Sequelize(database, user, pass, {
  dialect: "mysql",
  dialectModule: mysql2,
});

if (process.env.NODE_ENV === "development") {
  sequelize.sync();
}
