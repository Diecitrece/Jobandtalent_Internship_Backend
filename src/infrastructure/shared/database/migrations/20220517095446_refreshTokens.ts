import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refreshTokens', (table: Knex.TableBuilder) => {
    table.string('refreshToken').unique().primary().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('refreshTokens');
}
