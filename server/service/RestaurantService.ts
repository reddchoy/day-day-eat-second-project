import type { Knex } from "knex";
import { table } from "../utils/table";
import { Restaurant, Restaurant_like } from "./model";

export class RestaurantService {
  constructor(private knex: Knex) {}
  async getRestaurants() {
    const result = await this.knex(table.RESTAURANT)
      .select<Restaurant[]>(
        `${table.RESTAURANT}.id`,
        `${table.RESTAURANT}.name`,
        `${table.RESTAURANT}.price`,
        `${table.RESTAURANT}.address`,
        `${table.RESTAURANT}.phone_number`,
        `${table.RESTAURANT}.description`,
        `${table.RESTAURANT}.business_hour`,
        `${table.RESTAURANT}.mtr_station`,
        `${table.RESTAURANT}.rest_image`,
        `${table.RESTAURANT}.tag`,
        `${table.RESTAURANT}.view_number`
      )
      .leftOuterJoin(
        `${table.REVIEW}`,
        `${table.REVIEW}.restaurant_id`,
        `${table.RESTAURANT}.id`
      )
      .groupBy(
        `${table.RESTAURANT}.id`
      )
      .select(
        this.knex.raw(
          `AVG(reviews.food_rating) AS food_rating, AVG(reviews.environment_rating) AS env_rating`
        )
      );
    return result;
  }

  async getRestaurantsByQuery(query: string, category: string) {
    let results = [];
    if (query.includes("/")) {
      const queryArray = query.split("/");
      for (let query of queryArray) {
        const restaurants = await this.knex(table.RESTAURANT)
          .select(
            `${table.RESTAURANT}.id`,
            `${table.RESTAURANT}.name`,
            `${table.RESTAURANT}.price`,
            `${table.RESTAURANT}.address`,
            `${table.RESTAURANT}.phone_number`,
            `${table.RESTAURANT}.description`,
            `${table.RESTAURANT}.business_hour`,
            `${table.RESTAURANT}.mtr_station`,
            `${table.RESTAURANT}.rest_image`,
            `${table.RESTAURANT}.tag`,
            `${table.RESTAURANT}.view_number`
          )
          .leftOuterJoin(
            `${table.REVIEW}`,
            `${table.REVIEW}.restaurant_id`,
            `${table.RESTAURANT}.id`
          )
          .groupBy(
            `${table.RESTAURANT}.id`
          )
          .select(
            this.knex.raw(
              `AVG(reviews.food_rating) AS food_rating, AVG(reviews.environment_rating) AS env_rating`
            )
          )
          .whereILike(category, `%${query}%`);
        for (let restaurant of restaurants) {
          results.push(restaurant);
        }
      }
      return results;
    } else {
      const result = await this.knex(table.RESTAURANT)
        .select(
          `${table.RESTAURANT}.id`,
          `${table.RESTAURANT}.name`,
          `${table.RESTAURANT}.price`,
          `${table.RESTAURANT}.address`,
          `${table.RESTAURANT}.phone_number`,
          `${table.RESTAURANT}.description`,
          `${table.RESTAURANT}.business_hour`,
          `${table.RESTAURANT}.mtr_station`,
          `${table.RESTAURANT}.rest_image`,
          `${table.RESTAURANT}.tag`,
          `${table.RESTAURANT}.view_number`
        )
        .leftOuterJoin(
          `${table.REVIEW}`,
          `${table.REVIEW}.restaurant_id`,
          `${table.RESTAURANT}.id`
        )
        .groupBy(
          `${table.RESTAURANT}.id`
        )
        .select(
          this.knex.raw(
            `AVG(reviews.food_rating) AS food_rating, AVG(reviews.environment_rating) AS env_rating`
          )
        )
        .whereILike(category, `%${query}%`);
      return result;
    }
  }

  async insertReview(
    food_rating: number,
    environment_rating: number,
    content: string,
    review_image: string,
    view_number: number,
    user_id: number,
    restaurant_id: number
  ) {
    await this.knex(table.REVIEW).insert([
      {
        food_rating,
        environment_rating,
        content,
        review_image,
        view_number,
        user_id,
        restaurant_id,
      },
    ]);
  }

  async insertLikeRecord(user_id: number, restaurant_id: number) {
    const userLikedRest = await this.knex<Restaurant_like>(
      table.RESTAURANT_LIKE
    )
      .select("*")
      .where("user_id", user_id)
      .where("restaurant_id", restaurant_id)
      .first();
    if (!userLikedRest) {
      await this.knex(table.RESTAURANT_LIKE).insert([
        {
          user_id,
          restaurant_id,
        },
      ]);
      return;
    }

    if (userLikedRest.is_active) {
      const queryResult = (
        await this.knex<Restaurant_like>(table.RESTAURANT_LIKE)
          .update({ is_active: false })
          .where("user_id", user_id)
          .where("restaurant_id", restaurant_id)
          .returning("is_active")
      )[0].is_active;

      return queryResult;
    }
    const queryResult = (
      await this.knex<Restaurant_like>(table.RESTAURANT_LIKE)
        .update({ is_active: true })
        .where("user_id", user_id)
        .where("restaurant_id", restaurant_id)
        .returning("is_active")
    )[0].is_active;
    return queryResult;
  }

  async selectUserLikedRest(user_id: number) {
    const queryResult = await this.knex<Restaurant_like>(table.RESTAURANT_LIKE)
      .select("restaurant_id")
      .where("user_id", user_id)
      .where("is_active", true);
    return queryResult;
  }

  async getRestaurantDetails(restId: number) {
    const result = await this.knex(table.RESTAURANT)
      .select<Restaurant[]>(
        `${table.RESTAURANT}.id`,
        `${table.RESTAURANT}.name`,
        `${table.RESTAURANT}.price`,
        `${table.RESTAURANT}.address`,
        `${table.RESTAURANT}.phone_number`,
        `${table.RESTAURANT}.description`,
        `${table.RESTAURANT}.business_hour`,
        `${table.RESTAURANT}.mtr_station`,
        `${table.RESTAURANT}.rest_image`,
        `${table.RESTAURANT}.tag`,
        `${table.RESTAURANT}.view_number`
      )
      .leftOuterJoin(
        `${table.REVIEW}`,
        `${table.REVIEW}.restaurant_id`,
        `${table.RESTAURANT}.id`
      )
      .groupBy(
        `${table.RESTAURANT}.id`
      )
      .select(
        this.knex.raw(
          `AVG(reviews.food_rating) AS food_rating, AVG(reviews.environment_rating) AS env_rating`
        )
      )
      .where(`${table.RESTAURANT}.id`, restId);
    return result;
  }

  async getFoodImages(restId: number) {
    const result = await this.knex(table.FOOD_IMAGE)
      .select(
        `${table.FOOD_IMAGE}.id`,
        `${table.FOOD_IMAGE}.food_image`,
        `${table.FOOD_IMAGE}.restaurant_id`
      )
      .innerJoin(
        `${table.RESTAURANT}`,
        `${table.FOOD_IMAGE}.restaurant_id`,
        `${table.RESTAURANT}.id`
      )
      .where(`${table.FOOD_IMAGE}.restaurant_id`, restId);
    return result;
  }

  async getReivews(restId: number) {
    const result = await this.knex(table.REVIEW)
      .select(
        `${table.REVIEW}.id`,
        `${table.REVIEW}.food_rating`,
        `${table.REVIEW}.environment_rating`,
        `${table.REVIEW}.content`,
        `${table.REVIEW}.review_image`,
        `${table.REVIEW}.view_number`,
        `${table.REVIEW}.restaurant_id`,
        `${table.REVIEW}.created_at`,
        `${table.REVIEW}.updated_at`,
        `${table.USER}.username`,
        `${table.USER}.profile_pic`
      )
      .innerJoin(`${table.USER}`, `${table.REVIEW}.user_id`, `${table.USER}.id`)
      .innerJoin(
        `${table.RESTAURANT}`,
        `${table.REVIEW}.restaurant_id`,
        `${table.RESTAURANT}.id`
      )
      .where(`${table.RESTAURANT}.id`, restId);
    return result;
  }

  async getHighRatingRest(predict_result: string) {
    const result = await this.knex(table.RESTAURANT)
      .select<Restaurant[]>(
        `${table.RESTAURANT}.id`,
        `${table.RESTAURANT}.name`,
        `${table.RESTAURANT}.price`,
        `${table.RESTAURANT}.address`,
        `${table.RESTAURANT}.phone_number`,
        `${table.RESTAURANT}.description`,
        `${table.RESTAURANT}.business_hour`,
        `${table.RESTAURANT}.mtr_station`,
        `${table.RESTAURANT}.rest_image`,
        `${table.RESTAURANT}.tag`,
        `${table.RESTAURANT}.view_number`
      )
      .leftOuterJoin(
        `${table.REVIEW}`,
        `${table.REVIEW}.restaurant_id`,
        `${table.RESTAURANT}.id`
      )
      .groupBy(
        `${table.RESTAURANT}.id`
      )
      .select(
        this.knex.raw(
          `AVG(reviews.food_rating) AS food_rating, AVG(reviews.environment_rating) AS env_rating`
        )
      )
      .where(`${predict_result}_rating`, ">=", "4");
    return result;
  }


  async getRestInfo(restaurant_id: number) {
    const result = await this.knex<Restaurant>(table.RESTAURANT)
    .where("id", restaurant_id);
    return result;
  }

  async updateRestaurantViewCount(restaurant_id: number) {
    const result = await this.knex<Restaurant>(table.RESTAURANT)
      .where("id", "=", restaurant_id)
      .update({ view_number: this.knex.raw(`view_number + 1`) });
    return result;
  }
}

