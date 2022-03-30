import knex, { Knex } from 'knex';
import path from 'path';
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
};
export default knexConfig;
