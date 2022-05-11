import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("companies", (table: Knex.TableBuilder) => {
    table.string("id").unique().primary().notNullable();
    table.string("name").notNullable();
    table.string("address").nullable();
    table.string("phone").nullable();
    table.integer("low_range_employees").nullable();
    table.integer("high_range_employees").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("companies");
}
