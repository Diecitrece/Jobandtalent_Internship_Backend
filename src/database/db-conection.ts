import knexConnection from 'knex';
const knexConnect = knexConnection({
        client: 'pg',
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        },
        acquireConnectionTimeout: 10000,
        pool: {
            afterCreate: (conn:any, done:any) => {
                conn.query('SET timezone="UTC";', (err:any)=>{
                  if (err) {
                    console.log(err)
                  }
                  done(err, conn)
                })
            }
        },
    },
);
export default knexConnect;
