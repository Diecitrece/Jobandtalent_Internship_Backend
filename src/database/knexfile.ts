import { Knex } from 'knex';
import path from 'path';
const knexConfig: Knex.Config = {
  client: 'postgresql',
  debug: true,
  useNullAsDefault: true,
  connection: {
    database: 'a-team-postgres',
    user: 'postgres',
    password: '123456',
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
