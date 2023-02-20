import type { Request, Response } from "express";
import { hashPassword } from "../utils/hash";
import { UserService } from "../service/UserService";
import formidable from "formidable";

export class UserController {
  constructor(private userService: UserService) { }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        res.status(401).json({ message: "missing username or password" });
        return;
      }
      const user = await this.userService.checkLogin(username, password);

      if (user) {
        req.session.user = { userId: user.id };
        res.status(200).json({ message: "login success", username });
        return;
      }
    } 
    catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      }
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      delete req.session.user;
      res.status(200).json({ message: "logged out" });
    } catch (error) {
      res.status(400).json({ message: "internal server error"});
    }
   
  };

  register = async (req: Request, res: Response) => {
    const userInfo = req.form.fields;
    const name = userInfo.username as string;
    const password = userInfo.password as string;
    const hashedPassword = await hashPassword(password);
    const email = userInfo.email as string;
    const mobile_number = userInfo.mobile_number as string;
    const profile_pic = (req.form.files["profile_pic"] as formidable.File)
      ?.newFilename;

    try {
      await this.userService.createAccount(
        name,
        hashedPassword,
        email,
        mobile_number,
        profile_pic
      );
      res.status(200).json({ message: "account created success" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  };

  getReqSessionAndUserName = async (req: Request, res: Response) => {
    const sessionId = req.session.user?.userId || 0;
    try {
      const username = await this.userService.getUserName(sessionId);
      res.status(200).json({ message: req.session.user, username });
    } catch (error) {
      res.status(400).json({ message: "internal server error"});
    }

  };

  getProfileInfo = async (req: Request, res: Response) => {
    const userId = req.session.user?.userId as number;
    try {
      const results = await this.userService.getProfileInfo(userId);
      res.status(200).json({ message: "success", data: results[0] });
    } catch (error) {
      res.status(400).json({ message: "Cannot get info" });
    }
  };

  uploadUserInfo = async (req: Request, res: Response) => {
    const userInfo = req.form.fields;

    const userId = req.session.user?.userId as number;
    const password = userInfo.password as string;
    const hashedPassword = await hashPassword(password);
    const email = userInfo.email as string;
    const mobile_number = userInfo.mobile_number as string;
    const profile_pic = (req.form.files["profile_pic"] as formidable.File)
      ?.newFilename;

    try {
      const result = await this.userService.uploadUserInfo(
        userId,
        hashedPassword,
        email,
        profile_pic,
        mobile_number
      );
      res.status(200).json({ message: "success upload profile info", info: result });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: err });
      }
    }
  };
  getLikedRecord = async (req: Request, res: Response) => {
    const userId = req.session.user?.userId as number;
    const result = await this.userService.getLikedRecord(userId);
    try {
      res
        .status(200)
        .json({ message: "success get liked record", data: result });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: err });
      }
    }
  };
  getReviewRecord = async (req: Request, res: Response) => {
    const userId = req.session.user?.userId as number;
    const result = await this.userService.getReviewRecord(userId);
    try {
      res
        .status(200)
        .json({ message: "success get review record", data: result });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: err });
      }
    }
  };

  deleteReviewRecord = async (req: Request, res: Response) => {
    const reviewId = parseInt(req.params.rid);
    const userId = req.session.user?.userId as number;
    try {
      await this.userService.deleteReviewRecord(reviewId, userId);
      res.status(200).json({ message: "success delete review" });
    } catch (error) {
      res.status(400).json({ message: "delete failed" });
    }

  };
}
