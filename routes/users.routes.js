import { Router } from "express";
import {
  userLoginController,
  userPurchaseController,
  userResetPasswordController,
  userSignupController,
} from "../controllers/users.controller.js";
import { userMiddleware } from "../middlewares/user.middelwares.js";

const userRouter = Router();

userRouter.post("/signup", userSignupController);
userRouter.post("/login", userLoginController);
userRouter.post("/reset-password", userResetPasswordController);
userRouter.post("/purchases", userMiddleware, userPurchaseController);

export default userRouter;
