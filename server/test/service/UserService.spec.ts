import Knex from "knex"
import { UserService } from "../../service/UserService";
import { hashPassword } from "../../utils/hash";

import knexConfig from "../../knexfile";


const config = knexConfig["test"];
const knex = Knex(config);

describe("UserService", () => {
    let userService: UserService;
    beforeEach(async () => {
        await knex("users").del();
        userService = new UserService(knex)
    })

    it("password should be correct", async () => {
        const passwordHashed = await hashPassword("111111")
        const [userId] = await knex.insert(
            [{username: "hihi", password: passwordHashed, email: "333333", profile_pic: "123.jpg", mobile_number: "1111122", is_admin: false, is_active: false }]
        ).into("users").returning("id")

        const user = await userService.checkLogin("hihi", "111111")

        expect(user).toMatchObject({id:userId.id,username: "hihi", password: passwordHashed})
    })

    it("insert new user data to db should be success",async () => {
        await userService.createAccount("user1", "1234", "123@123", "1234", "111.jpg")
        const newUser = await knex("users").select("*").where("username","user1")
        expect(newUser).toMatchObject([{username:"user1",password:"1234",email:"123@123",mobile_number:"1234",profile_pic:"111.jpg"}])
    })

    afterEach(async () => {
        await knex("users").del();

    });

    afterAll(async () => {
        await knex.destroy();
    });


})