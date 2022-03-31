import dotenv from 'dotenv'
import { Knex } from 'knex';
import path from 'path';

dotenv.config({ path: '../../.env' })

const knexConfig: Knex.Config = {
  client: 'postgresql',
  debug: true,
  useNullAsDefault: true,
  connection: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, './migrations'),
  },
  seeds: {
    directory: './seeds',
  }
};
export default knexConfig;
