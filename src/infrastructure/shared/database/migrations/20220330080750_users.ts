import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.string('id').unique().primary().notNullable();
    table.string('firstName').nullable();
    table.string('surNames').nullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('phone').nullable();
    table.string('address').nullable();
    table.enum('role', ['ADMIN', 'USER']).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
