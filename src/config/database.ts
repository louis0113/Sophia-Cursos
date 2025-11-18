import { Sequelize } from "sequelize";

interface DatabaseConfig {
  password: string;
  user: string;
  database: string;
}

const config: DatabaseConfig = {
  password: process.env.DATABASE_PASS || "",
  user: process.env.DATABASE_USER || "",
  database: process.env.DATABASE_NAME || "",
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const startDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao MySQL");

    await sequelize.sync();
    console.log("✅ Tabelas sincronizadas");
  } catch (err) {
    console.error("❌ Erro:", err);
    process.exit(1);
  }
};

startDatabase();

export default sequelize;
