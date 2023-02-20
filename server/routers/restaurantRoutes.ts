import express from "express";
import { restaurantController } from "../routes";
import { uploadMiddleWare } from "../utils/formidable";
import { isLoggedInApi } from "../utils/guard";

export const restaurantRoutes = express.Router();

restaurantRoutes.get("/", restaurantController.getRestaurants);

restaurantRoutes.get(
  "/details/:restId",
  restaurantController.getRestaurantDetails
);

restaurantRoutes.get(
  "/food_images/:restId",
  restaurantController.getFoodImages
);

restaurantRoutes.get(
  "/getRestaurantsByQueryFood",
  restaurantController.getRestaurantsByQueryFood
);

restaurantRoutes.get(
  "/getRestaurantsByQueryPlace",
  restaurantController.getRestaurantsByQueryPlace
);
restaurantRoutes.get(
  "/getRestaurantsByQueryPrice",
  restaurantController.getRestaurantsByQueryPrice
);

restaurantRoutes.get("/reviews/:restId", restaurantController.getReviews);

restaurantRoutes.post(
  "/uploadReview/:id",
  isLoggedInApi,
  uploadMiddleWare,
  restaurantController.userUploadReview
);

restaurantRoutes.get(
  "/like/:rid",
  isLoggedInApi,
  restaurantController.likeRestaurant
);

restaurantRoutes.get("/userLikedRest", restaurantController.getUserLikedRest);

restaurantRoutes.get(
  "/getHighRatingRest/:class",
  restaurantController.getHighRatingRest
);

restaurantRoutes.get("/search", restaurantController.getRestaurantsByKeywords);

restaurantRoutes.get("/getRestInfo", restaurantController.getRestInfo);
restaurantRoutes.put(
  "/updateRestaurantViewNumber/:id",
  restaurantController.updateRestaurantViewCount
);
// restaurantRoutes.get(
//   "/getRestaurantViewNumber",
//   restaurantController.getRestaurantViewCount
// );
