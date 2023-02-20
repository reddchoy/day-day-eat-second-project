import type { Request, Response } from "express";
import { UserController } from "../../controller/UserController";
import { UserService } from "../../service/UserService";
import { getMockRequest, getMockResponse } from "./utils";


jest.mock("../../service/UserService");



describe("UserController Test Case", () => {
    let controller: UserController
    let service: UserService
    let req: Request
    let res: Response

    beforeEach(() => {
        service = new UserService({} as any)
        
        req = getMockRequest();
        res = getMockResponse();
        controller = new UserController(service)
    })

    it("login should be success", async () => {
        const inputUsername = "user1"
        const inputPassword = "1234"
        req.body = { username: inputUsername, password: inputPassword}
        service.checkLogin = jest.fn(() =>
        Promise.resolve({ id: 1, username: "user1", password: "1234" })
      );
        await controller.login(req, res);
        expect(service.checkLogin).toBeCalledWith(inputUsername,inputPassword);
        expect(req.session.user).toEqual({userId:1});
        expect(res.json).lastCalledWith({message: "login success", username: "user1"});
        expect(res.json).toBeCalledTimes(1);
    })

    it("logout should be success", async () =>{
        await controller.logout(req,res);
        expect(req.session["user"]).toBeNull;
        expect(res.json).toBeCalledTimes(1)
    })

    
})