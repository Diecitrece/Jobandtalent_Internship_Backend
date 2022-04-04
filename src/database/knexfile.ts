import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import { Knex } from 'knex';

interface KnexConfig {
  [key: string]: Knex.Config;
}

const configs: KnexConfig = {
  development: {
    client: 'pg',
    debug: true,
    useNullAsDefault: true,
    connection: {
      host: 'db',
      port: 5432,
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
    },
  },
};
export default configs;
