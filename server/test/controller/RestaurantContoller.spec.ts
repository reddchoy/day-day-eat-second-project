import type { Request, Response } from "express";
import { RestaurantController } from "../../controller/RestaurantController";
import { RestaurantService } from "../../service/RestaurantService";
import { getMockRequest, getMockResponse } from "./utils";

jest.mock("../../service/RestaurantService");

describe("RestaurantController Test Case", () => {
  let controller: RestaurantController;
  let service: RestaurantService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new RestaurantService({} as any);
    req = getMockRequest();
    res = getMockResponse();
    controller = new RestaurantController(service);
  });

  it("getRestaurantDetails should be Success", async () => {
    const restId = "1"
    req.params.restId = restId;
    const data = [{ id: 1, name: "test", price: "$101-200", address:"tst", phone_number: "21123333", description: "good", business_hour: "12:00-22:00", mtr_station: "tst", rest_image: "322.jpeg", tag: "sushi", food_rating: 4.0 , env_rating: 3.1}];

    service.getRestaurantDetails = jest.fn(() => Promise.resolve(data));

    await controller.getRestaurantDetails(req, res);

    expect(service.getRestaurantDetails).toBeCalledWith(+restId);
    expect(res.json).toBeCalledWith(data[0]);
    expect(res.json).toBeCalledTimes(1);
  });


  it("getRestaurants should be Success", async () => {
    
    const data = [{ id: 1, name: "test", price: "$101-200", address:"tst", phone_number: "21123333", description: "good", business_hour: "12:00-22:00", mtr_station: "tst", rest_image: "322.jpeg", tag: "sushi", food_rating: 4.0 , env_rating: 3.1}];

    service.getRestaurants = jest.fn(() => Promise.resolve(data));
    await controller.getRestaurants(req, res);
    
    
    expect(res.json).toBeCalledWith(data);
    expect(res.json).toBeCalledTimes(1);
  });


  it("getFoodImages should be Success", async () => {
    const restId = "1"
    req.params.restId = restId;
    const data = [{ id: 1, food_image: "test", restaurant_id: 1}];

    service.getFoodImages = jest.fn(() => Promise.resolve(data));
    await controller.getFoodImages(req, res);
    
    expect(service.getFoodImages).toBeCalledWith(+restId);
    expect(res.json).toBeCalledWith(data);
    expect(res.json).toBeCalledTimes(1);
  });


  it("getReviews should be Success", async () => {
    const restId = "1"
    req.params.restId = restId;

    const data = [{ id: 1, food_rating: 3.5, environment_rating: 3.5, content: "test", review_image: "123.jpeg", view_number: "2", restaurant_id: 1, created_at: "2022-12-12", updared_at: "2022-12-12", username: "user1", profile_pic: "user1.jpeg"}];

    service.getReivews = jest.fn(() => Promise.resolve(data));
    await controller.getReviews(req, res);
    
    expect(service.getReivews).toBeCalledWith(+restId);
    expect(res.json).toBeCalledWith(data);
    expect(res.json).toBeCalledTimes(1);
  });

  it("getLikedRest should be success" , async () =>{
    const user_id = 1;
    req.session.user = {userId:user_id}
    const data = [{restaurant_id:2}]
    service.selectUserLikedRest = jest.fn(() => Promise.resolve(data))
    await controller.getUserLikedRest(req,res);
    expect(service.selectUserLikedRest).toBeCalledWith(user_id)
    expect(res.json).toBeCalledWith({ message: data })
    expect(res.json).toBeCalledTimes(1)
  })

});
