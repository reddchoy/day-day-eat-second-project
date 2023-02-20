import express from "express";
import { userController } from "../routes";
import { uploadMiddleWare } from "../utils/formidable";
import { isLoggedInApi } from "../utils/guard";

export const userRoutes = express.Router();

userRoutes.post("/login", userController.login);

userRoutes.post("/register", uploadMiddleWare, userController.register);
userRoutes.get("/logout", isLoggedInApi, userController.logout);

userRoutes.put(
  "/editProfile",
  isLoggedInApi,
  uploadMiddleWare,
  userController.uploadUserInfo
);
userRoutes.get("/profile", isLoggedInApi, userController.getProfileInfo);
userRoutes.get("/likedRecords", isLoggedInApi, userController.getLikedRecord);
userRoutes.get("/reviewRecords", isLoggedInApi, userController.getReviewRecord);
userRoutes.put(
  "/deleteReviewRecords/:rid",
  isLoggedInApi,
  userController.deleteReviewRecord
);

userRoutes.get(
  "/getReqSessionAndUserName",
  userController.getReqSessionAndUserName
);
