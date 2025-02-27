import { Router } from "express";
import {
  creatorAddCourseContentController,
  creatorAddCourseController,
  creatorAllCoursesController,
  creatorAllCreatorsController,
  creatorEditCourseController,
  creatorLoginController,
  creatorRemoveCourseController,
  creatorResetPasswordController,
  creatorSignupController,
} from "../controllers/creators.controller.js";
import { creatorMiddleware } from "../middlewares/creator.middelwares.js";

const creatorRouter = Router();

creatorRouter.post("/signup", creatorSignupController);
creatorRouter.post("/login", creatorLoginController);
creatorRouter.post("/reset-password", creatorResetPasswordController);
creatorRouter.post(
  "/add-course",
  creatorMiddleware,
  creatorAddCourseController
);
creatorRouter.delete(
  "/remove-course",
  creatorMiddleware,
  creatorRemoveCourseController
);
creatorRouter.put(
  "/add-course-content",
  creatorMiddleware,
  creatorAddCourseContentController
);
creatorRouter.put(
  "/edit-course",
  creatorMiddleware,
  creatorEditCourseController
);
creatorRouter.get(
  "/all-courses",
  creatorMiddleware,
  creatorAllCoursesController
);
creatorRouter.get("/all-creators", creatorAllCreatorsController);

export default creatorRouter;
