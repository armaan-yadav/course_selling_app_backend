import { Router } from "express";

const coursesRouter = Router();

coursesRouter.get("/all", (req, res) => {});
coursesRouter.post("/purchase", (req, res) => {});
coursesRouter.post("/preview", (req, res) => {});

export default coursesRouter;
