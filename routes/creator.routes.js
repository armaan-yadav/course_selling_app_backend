import { Router } from "express";
import {
  creatorLoginController,
  creatorResetPasswordController,
  creatorSignupController,
} from "../controllers/creators.controller.js";

const creatorRouter = Router();

creatorRouter.post("/signup", creatorSignupController);
creatorRouter.post("/login", creatorLoginController);
creatorRouter.post("/reset-password", creatorResetPasswordController);
creatorRouter.post("/add-course", (req, res) => {});
creatorRouter.delete("/remove-course", (req, res) => {});
creatorRouter.put("/add-course-content", (req, res) => {});
creatorRouter.get("/all", (req, res) => {});

export default creatorRouter;
