import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const url = process.env.DATABASE_URL;

export const sequelize = new Sequelize(url, {
  dialectModule: mysql2,
});

if (process.env.NODE_ENV === "development") {
  sequelize.sync({ force: true });
}
