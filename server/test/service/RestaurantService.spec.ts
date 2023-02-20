import Knex from "knex"
import { RestaurantService } from "../../service/RestaurantService";
import knexConfig from "../../knexfile";


const config = knexConfig["test"];
const knex = Knex(config);


describe("RestaurantService", () => {

    let restaurantService: RestaurantService;

    beforeEach(async () => {
        await knex("restaurants").del();
        await knex("food_images").del();

        restaurantService = new RestaurantService(knex)

    })

    it("should get all restaurants from DB", async () => {
        await knex.insert([
            {name: "test", price: "$101-200", address: "tst", phone_number: "12345678", description: "japanese cuisine", business_hour: "1200-2200",
            mtr_station: "tst", rest_image: "abc.png", tag: "sushi"},
        ]).into("restaurants");

        const restaurant = await restaurantService.getRestaurants()

        expect(restaurant).toMatchObject([
            {name: "test", price: "$101-200", address: "tst", phone_number: "12345678", description: "japanese cuisine", business_hour: "1200-2200",
            mtr_station: "tst", rest_image: "abc.png", tag: "sushi"},
        ]);
    });

    it("should get food images from DB", async () => {
        const restaurant =  await knex.insert([
            {name: "test", price: "$101-200", address: "tst", phone_number: "12345678", description: "japanese cuisine", business_hour: "1200-2200",
            mtr_station: "tst", rest_image: "abc.png", tag: "sushi"},
        ]).into("restaurants").returning("id");

        await knex.insert([
            {food_image: "test.png", restaurant_id: restaurant[0].id},
        ]).into("food_images");

        const foodImage = await restaurantService.getFoodImages(restaurant[0].id)

        expect(foodImage).toMatchObject([
            {food_image: "test.png", restaurant_id: restaurant[0].id},
        ]);
    });

    afterEach(async () => {
        await knex("food_images").del();
        await knex("restaurants").del();

    });


    afterAll(async () => {
        await knex.destroy();
      });
});