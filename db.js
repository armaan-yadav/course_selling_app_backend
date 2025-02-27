import mongoose, { Model, Schema, Types } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  fullName: String,
  state: String,
  city: String,
});

const creatorSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  fullName: String,
  state: String,
  city: String,
});

const courseSchema = new Schema({
  creatorId: Types.ObjectId,
  title: String,
  description: String,
  content: [String],
  price: Number,
  thumbnailUrl: String,
});

const purchaseSchema = new Schema({
  courseId: Types.ObjectId,
  userId: Types.ObjectId,
});

export const userModel = mongoose.model("user", userSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const creatorModel = mongoose.model("creator", creatorSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);
