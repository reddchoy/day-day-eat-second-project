import { Knex } from "knex";

const userTableName = "users";
const restaurantTableName = "restaurants";
const foodImgTableName = "food_images";
const reviewTableName = "reviews";
const restaurantLikeTableName = "restaurant_likes";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(userTableName, (table) => {
    table.increments();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.string("profile_pic");
    table.string("mobile_number");
    table.boolean("is_admin").defaultTo(false);
    table.boolean("is_active").defaultTo(true);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(restaurantTableName, (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("price").notNullable();
    table.string("address").notNullable();
    table.string("phone_number").notNullable();
    table.string("description").notNullable();
    table.string("business_hour").notNullable();
    table.string("mtr_station").notNullable();
    table.string("rest_image").notNullable();
    table.string("tag").notNullable();
    table.boolean("is_active").defaultTo(true);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(foodImgTableName, (table) => {
    table.increments();
    table.string("food_image").notNullable();
    table.integer("restaurant_id").unsigned().notNullable();
    table.foreign("restaurant_id").references(`${restaurantTableName}.id`);
    table.boolean("is_active").defaultTo(true);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(reviewTableName, (table) => {
    table.increments();
    table.decimal("food_rating", 2, 1).notNullable();
    table.decimal("environment_rating", 2, 1).notNullable();
    table.string("content").notNullable();
    table.string("review_image");
    table.integer("view_number");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references(`${userTableName}.id`);
    table.integer("restaurant_id").unsigned().notNullable();
    table.foreign("restaurant_id").references(`${restaurantTableName}.id`);
    table.boolean("is_active").defaultTo(true);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(restaurantLikeTableName, (table) => {
    table.increments();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references(`${userTableName}.id`);
    table.integer("restaurant_id").unsigned().notNullable();
    table.foreign("restaurant_id").references(`${restaurantTableName}.id`);
    table.boolean("is_active").defaultTo(true);
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(restaurantLikeTableName);
  await knex.schema.dropTableIfExists(reviewTableName);
  await knex.schema.dropTableIfExists(foodImgTableName);
  await knex.schema.dropTableIfExists(restaurantTableName);
  await knex.schema.dropTableIfExists(userTableName);
}
