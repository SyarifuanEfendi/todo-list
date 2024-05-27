import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOSTNAME,
    dialectModule: pg,
    dialect: "postgres",
  }
);

export default sequelize;
