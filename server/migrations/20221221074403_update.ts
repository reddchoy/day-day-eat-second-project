import { Knex } from "knex";

const restaurantTableName = "restaurants";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.table(restaurantTableName, (table) => {
    table.integer("view_number");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(restaurantTableName, (table) => {
    table.dropColumn("view_number");
  });
}
