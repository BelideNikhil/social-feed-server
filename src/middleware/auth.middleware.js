import { Router } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req?.cookies?.token;
  //   no token
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  //   invalid token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // this gives us the user data to be passed to next middleware in case you wanna know which user has logged in
    req.user = decoded;
    next();
  });

  // check token in req.cookies
  // error if invalid
  // else call next. This will automatically move control to next middleware
};
