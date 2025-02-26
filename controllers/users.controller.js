import { userModel as User } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userSignupController(req, res) {
  try {
    //extract data
    const { username, email, password, fullName, state, city } = req.body;

    // Validate input
    if (!username || !email || !password || !fullName || !state || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      state,
      city,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token
    res.status(201).json({ token, message: "Signup successfull!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong! ", error });
  }
}

export async function userLoginController(req, res) {
  try {
    const { username, password } = req.body;

    //validate the input
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are rquired" });
    }

    // check  if the user exists in the db
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // comapre to the one from the db
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password " });
    }

    //password  correct => generate  jwt token and return
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    res.status(500).json({ message: "Somethign went wrong! ", error });
  }
}

export async function userResetPasswordController(req, res) {
  try {
    //extrat  the data
    const { username, oldPassword, newPassword } = req.body;

    // validate  the data
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check if the user exists in the db
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    //user exists => check the old  password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect old password" });
    }
    //password correct => hash the new  password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //update in db
    await user.updateOne({ password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Somethign went wrong! ", error });
  }
}

export async function userPurchaseController(req, res) {
  try {
    res.status(200).json({
      message: "data fetched successfully",
      data: {},
      userId: req.userId,
    });
  } catch (error) {
    res.status(500).json({ message: "Somethign went wrong! ", error });
  }
}
