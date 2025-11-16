import { Sequelize } from "sequelize";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não está definida no .env");
}

export const sequelize = new Sequelize(databaseUrl, {});
