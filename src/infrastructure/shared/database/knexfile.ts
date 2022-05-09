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
      host: 'postgres',
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
    seeds: {
      directory: './seeds',
    },
  },
  test: {
    client: 'pg',
    debug: true,
    useNullAsDefault: true,
    connection: ':memory:',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default configs;
