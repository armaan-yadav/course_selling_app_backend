import express from "express";
import userRouter from "./routes/users.routes.js";
import coursesRouter from "./routes/courses.routes.js";
import creatorRouter from "./routes/creator.routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./db.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/creators", creatorRouter);

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
    app.listen(port, () => {
      console.log("App is running on : ", port);
    });
  } catch (error) {
    console.log("Error connecting database \n", error);
  }
}

connectDb();
