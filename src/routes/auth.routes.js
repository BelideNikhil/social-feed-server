import { Router } from "express";
import {
  getUserController,
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { preventCachingMiddleware } from "../middleware/cache.middleware.js";

export const authRoutes = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);
authRoutes.get(
  "/me",
  preventCachingMiddleware,
  authMiddleware,
  getUserController,
);
authRoutes.post(
  "/logout",
  preventCachingMiddleware,
  authMiddleware,
  logoutController,
);
