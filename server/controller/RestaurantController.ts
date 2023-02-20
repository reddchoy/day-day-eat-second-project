import { RestaurantService } from "../service/RestaurantService";
import type { Request, Response } from "express";
import formidable from "formidable";
import { readFile } from "fs/promises";
import fetch from "cross-fetch";

export class RestaurantController {
  constructor(private restaurantService: RestaurantService) { }

  getRestaurants = async (req: Request, res: Response) => {
    const restaurants = await this.restaurantService.getRestaurants();
    res.json(restaurants);
  };

  getRestaurantsByQueryFood = async (req: Request, res: Response) => {
    const query = req.query.category as string;
    const restaurants = await this.restaurantService.getRestaurantsByQuery(
      query,
      "tag"
    );
    const filteredResult = restaurants.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
    res.json(filteredResult);
  };

  getRestaurantsByQueryPlace = async (req: Request, res: Response) => {
    const query = req.query.place as string;

    const restaurants = await this.restaurantService.getRestaurantsByQuery(
      query,
      "mtr_station"
    );

    const filteredResult = restaurants.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
    res.json(filteredResult);
  };

  getRestaurantsByQueryPrice = async (req: Request, res: Response) => {
    const query = req.query.price as string;
    const restaurants = await this.restaurantService.getRestaurantsByQuery(
      query,
      "price"
    );
    const filteredResult = restaurants.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
    res.json(filteredResult);
  };

  getRestaurantsByKeywords = async (req: Request, res: Response) => {
    const query = req.query.keyword as string;
    const restaurants = await this.restaurantService.getRestaurantsByQuery(
      query,
      "name"
    );
    res.json(restaurants);
  };

  userUploadReview = async (req: Request, res: Response) => {
    const restaurant_id = parseInt(req.params.id);
    const userReview = req.form.fields;

    const food_rating = parseInt(userReview.food_rating as string);
    const restaurant_rating = parseInt(userReview.restaurant_rating as string);
    const review_content = userReview.review_content as string;
    const review_pic = (req.form.files["review_pic"] as formidable.File)
      ?.newFilename;
    const user_id = req.session["user"]?.userId || 0;

    if (!review_pic || !review_content) {
      res.status(400).json({ message: "請輸入所有頂目才可提交" });
      return;
    }

    try {
      await this.restaurantService.insertReview(
        food_rating,
        restaurant_rating,
        review_content,
        review_pic,
        0,
        user_id,
        restaurant_id
      );
    } catch (error) {
      res.status(400).json({ message: "internal server error" })
    }


    const content = await readFile(
      (req.form.files["review_pic"] as formidable.File).filepath,
      {
        encoding: "base64",
      }
    );

    try {
      const resp = await fetch("http://localhost:8000/food-env-predict", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ review_pic: content }),
      });

      const data = await resp.json();

      res
        .status(200)
        .json({ message: "review uploaded", predict_result: data });
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }
  };

  likeRestaurant = async (req: Request, res: Response) => {
    const likedRestaurant_id = parseInt(req.params.rid);
    const user_id = req.session["user"]?.userId || 0;

    try {
      const likeBoolean = await this.restaurantService.insertLikeRecord(
        user_id,
        likedRestaurant_id
      );
      res.json({ message: likeBoolean });
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }

  };

  getUserLikedRest = async (req: Request, res: Response) => {
    const user_id = req.session["user"]?.userId || 0;
    try {
      const userLikedRest = await this.restaurantService.selectUserLikedRest(
        user_id
      );
      res.json({ message: userLikedRest });
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }
  };

  getRestaurantDetails = async (req: Request, res: Response) => {
    const restId = parseInt(req.params.restId);
    if (isNaN(restId)) {
      res.status(400).json({ message: "id is not an integer" });
      return;
    }
    try {
      const [restDetails] = await this.restaurantService.getRestaurantDetails(
        restId
      );
      res.json(restDetails);
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }
  };

  getFoodImages = async (req: Request, res: Response) => {
    const restId = parseInt(req.params.restId);
    if (isNaN(restId)) {
      res.status(400).json({ message: "id is not an integer" });
      return;
    }
    try {
      const foodImages = await this.restaurantService.getFoodImages(restId);
      res.json(foodImages);
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }
  };

  getReviews = async (req: Request, res: Response) => {
    const restId = parseInt(req.params.restId);
    if (isNaN(restId)) {
      res.status(400).json({ message: "id is not an integer" });
      return;
    }
    try {
      const reviews = await this.restaurantService.getReivews(restId);
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ message: "internal service error" });

    }
  };

  getHighRatingRest = async (req: Request, res: Response) => {
    const predict_result = req.params.class;
    try {
      const restArray = await this.restaurantService.getHighRatingRest(
        predict_result
      );
      if (!restArray) {
        res.json({ message: "no result" });
        return
      }
      res.json(restArray);
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }
  };

  getRestInfo = async (req: Request, res: Response) => {
    const restaurant_id = req.body.id as any as number;
    try {
      const result = await this.restaurantService.getRestInfo(restaurant_id);
      res.status(200).json({
        message: "get rest info success",
        result: result,
      });
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }

  };
  updateRestaurantViewCount = async (req: Request, res: Response) => {
    const restaurant_id = parseInt(req.body.id);
    try {
      const result = await this.restaurantService.updateRestaurantViewCount(
        restaurant_id
      );
      res.status(200).json({
        message: "update Restaurant Review Count success",
        result: result,
      });
    } catch (error) {
      res.status(400).json({ message: "internal service error" });
    }
  };
}
