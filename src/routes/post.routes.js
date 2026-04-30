import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import { fileParser } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const postRouter = Router();
postRouter.post(
  "/create",
  authMiddleware,
  fileParser.single("image"),
  createPost,
);
postRouter.get("/all", authMiddleware, getAllPosts);
