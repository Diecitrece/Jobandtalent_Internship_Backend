import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env' });
import { Knex } from 'knex';
import { UserRole } from '../../../../core/domain/user.model';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.string('id').unique().primary().notNullable();
    table.string('firstName').nullable();
    table.string('surNames').nullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('phone').nullable();
    table.string('address').nullable();
    table.enum('role', [UserRole.ADMIN, UserRole.USER]).notNullable();
  });

  await knex
    .insert({
      id: '5acb2b6f-9777-4a58-b971-ce08ebe227b4',
      firstName: 'Admin',
      surNames: 'Admin',
      email: process.env.SUPER_USER_EMAIL,
      password: process.env.SUPER_USER_PASSWORD_ENCRYPTED,
      phone: '000000000',
      address: 'No address',
      role: UserRole.ADMIN,
    })
    .into('users');
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
