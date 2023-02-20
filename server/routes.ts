import { knex} from "./main";
import express from "express";

import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { RestaurantService } from "./service/RestaurantService";
import { RestaurantController } from "./controller/RestaurantController";


const userService = new UserService(knex);
export const userController = new UserController(userService);

const restaurantService = new RestaurantService(knex);
export const restaurantController = new RestaurantController(restaurantService);


import { userRoutes } from "./routers/userRoutes";
import { restaurantRoutes } from "./routers/restaurantRoutes";

export const routes = express.Router();
routes.use("/users", userRoutes);
routes.use("/restaurants", restaurantRoutes);
