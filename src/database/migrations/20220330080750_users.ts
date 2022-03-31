import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').unique().primary();
    table.string('firstName');
    table.string('surNames');
    table.string('email').unique();
    table.string('password');
    table.string('phone');
    table.string('address');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
