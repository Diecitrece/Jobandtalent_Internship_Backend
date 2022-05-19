import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refreshTokens', (table: Knex.TableBuilder) => {
    table.string('refreshToken', 500).unique().primary().notNullable();
    table.string('idUser').unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('refreshTokens');
}
