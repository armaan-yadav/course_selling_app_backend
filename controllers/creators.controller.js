import { creatorModel as Creator } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function creatorSignupController(req, res) {
  try {
    //extract data
    const { username, email, password, fullName, state, city } = req.body;

    // Validate input
    if (!username || !email || !password || !fullName || !state || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingCreator = await Creator.findOne({ email });
    if (existingCreator) {
      return res.status(400).json({ message: "Creator already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newCreator = new Creator({
      username,
      email,
      password: hashedPassword,
      fullName,
      state,
      city,
    });

    await newCreator.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newCreator._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token
    res.status(201).json({ token, message: "Signup successfull as Creator!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong! ", error });
  }
}

export async function creatorLoginController(req, res) {
  try {
    const { username, password } = req.body;

    //validate the input
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are rquired" });
    }

    // check  if the user exists in the db
    const creator = await Creator.findOne({ username });
    if (!creator) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // comapre to the one from the db
    const isPasswordCorrect = await bcrypt.compare(password, creator.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password " });
    }

    //password  correct => generate  jwt token and return
    const token = jwt.sign({ userId: creator._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login Successfull as creator", token });
  } catch (error) {
    res.status(500).json({ message: "Somethign went wrong! ", error });
  }
}

export async function creatorResetPasswordController(req, res) {
  try {
    //extrat  the data
    const { username, oldPassword, newPassword } = req.body;

    // validate  the data
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check if the user exists in the db
    const creator = await Creator.findOne({ username });
    if (!creator) {
      return res.status(400).json({ message: "Creator does not exist" });
    }
    //user exists => check the old  password
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      creator.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect old password" });
    }
    //password correct => hash the new  password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //update in db
    await creator.updateOne({ password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Somethign went wrong! ", error });
  }
}
