import type { Knex } from "knex";
import { checkPassword } from "../utils/hash";
import { table } from "../utils/table";
import { User } from "./model";
export class UserService {
  constructor(private knex: Knex) {}

  async checkLogin(username: string, password: string) {
    const queryResult = await this.knex<User>(table.USER)
      .select("id", "username", "password")
      .where("username", username)
      .first();
    if (queryResult && (await checkPassword(password, queryResult.password))) {
      return queryResult;
    }
    throw new Error("invalid password or username");
  }

  async createAccount(
    username: string,
    password: string,
    email: string,
    mobile_number: string,
    profile_pic: string
  ) {
    const queryResults = await this.knex<User>(table.USER).select("username");
    queryResults.forEach((queryResult) => {
      if (queryResult.username == username) {
        throw new Error("username already exists");
      }
    });
    await this.knex<User>(table.USER).insert([
      { username, password, email, mobile_number, profile_pic },
    ]);
  }

  async getProfileInfo(id: number) {
    const user_id = id;
    const result = await this.knex<User>(table.USER)
      .select("*")
      .where("id", user_id);
    return result;
  }

  async uploadUserInfo(
    id: number,
    password: string,
    email: string,
    profile_pic: string,
    mobile_number: string
  ) {
    const user_id = id;
    const result = await this.knex<User>(table.USER)
      .select(`id`, `profile_pic`, `email`, `password`, `mobile_number`)
      .where(`id`, user_id)
      .update({
        profile_pic: profile_pic,
        email: email,
        password: password,
        mobile_number: mobile_number,
      });
    return result;
  }
  async getUserName(sessionUserId: number) {
    const queryResult = await this.knex<User>(table.USER)
      .select("username")
      .where("id", sessionUserId)
      .first();
    return queryResult;
  }

  async getLikedRecord(likesUserId: number) {
    const result = await this.knex(table.RESTAURANT_LIKE)
      .select(
        "restaurant_likes.id",
        "restaurant_likes.user_id",
        "restaurant_likes.restaurant_id",
        "restaurants.name",
        "restaurants.price",
        "restaurants.address",
        "restaurants.phone_number",
        "restaurants.rest_image",
        "restaurants.tag",
        "restaurants.view_number",
        "restaurants.is_active"
      )
      .innerJoin(
        table.RESTAURANT,
        "restaurants.id",
        "restaurant_likes.restaurant_id"
      )
      .where("restaurant_likes.user_id", "=", likesUserId)
      .where("restaurant_likes.is_active", "=", true);
    return result;
  }

  async deleteReviewRecord(reviewRecordId: number, userId: number) {
    await this.knex(table.REVIEW)
      .update({ is_active: false })
      .where("id", reviewRecordId)
      .where("user_id", userId);
  }

  async getReviewRecord(reviewUserId: number) {
    const result = await this.knex(table.REVIEW)
      .select(
        "reviews.id",
        "reviews.user_id",
        "reviews.restaurant_id",
        "reviews.view_number",
        "reviews.review_image",
        "reviews.content",
        "reviews.environment_rating",
        "reviews.food_rating",
        "reviews.created_at",
        "restaurants.name",
        "reviews.is_active"
      )
      .innerJoin(table.RESTAURANT, "reviews.restaurant_id", "restaurants.id")
      .where("user_id", "=", reviewUserId)
      .where("reviews.is_active", "=", true);
    return result;
  }
}

