const knexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'a-team-dev',
      user: 'postgres',
      password: '123456',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'a-team-production',
      user: 'postgres',
      password: '123456',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default knexConfig;
