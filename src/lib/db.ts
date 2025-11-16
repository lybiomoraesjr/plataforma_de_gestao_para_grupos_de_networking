import { Sequelize } from 'sequelize';
import pg from 'pg';

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

if (!DATABASE_NAME || !DATABASE_USER || !DATABASE_HOST || !DATABASE_PORT) {
  throw new Error('Variáveis de ambiente do banco de dados não estão definidas');
}

export const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD, 
  {
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT, 10),
    dialect: 'postgres',
    logging: console.log,
    dialectModule: pg,
  }
);