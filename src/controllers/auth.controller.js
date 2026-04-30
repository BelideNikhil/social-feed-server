import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/auth.model.js";
import { cookieConfig } from "../config/cookie.config.js";

// bcryct.hash() to encrypt password
// bcrypt.compare() to compare password and hashedPassword

export async function signupController(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res
      .cookie("token", token, cookieConfig)
      .status(201)
      .json({
        message: "User created successfully.",
        success: true,
        user: {
          name,
          email,
          id: data?._id,
        },
      });
  } catch (error) {
    console.log("error", error);
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists.!" });
    }
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const isFound = await User.findOne({ email });
    // Email check
    if (!isFound) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }
    // Password check
    const isMatch = await bcrypt.compare(password, isFound.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    console.log("isFound", isFound);
    //
    const token = jwt.sign({ id: isFound._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res
      .cookie("token", token, cookieConfig)
      .status(201)
      .json({
        success: true,
        message: "Login successful.",
        user: {
          name: isFound?.name,
          email: isFound?.email,
          id: isFound?._id,
        },
      });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getUserController(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) req.status(401).json({ message: "User not found" });
    //
    res.status(200).json({
      message: "User has been verified.",
      user: {
        name: user?.name,
        email: user?.email,
        id: user?._id,
      },
      success: true,
    });
  } catch (error) {
    console.log("err", error);
    res.status(500).send("Internal server error");
  }
}

export async function logoutController(req, res) {
  try {
    res.clearCookie("token", cookieConfig);
    // below is a good way if we want t cleanup stuff during logout
    // res.set('Clear-Site-Data', '"cookies", "storage", "cache"');
    res.status(200).json("Logout successful.");
  } catch (error) {
    res.status(500).json("Internal server error during logout.");
  }
}
