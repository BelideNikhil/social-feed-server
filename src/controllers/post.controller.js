import { Post } from "../models/post.model.js";
import { uploadToCloudinary } from "../services/uploadService.js";
import jwt from "jsonwebtoken";

export async function createPost(req, res) {
  try {
    const post = req.body;
    // below user is coming from auth middleware
    const user = req.user;
    const imageBuffer = req.file.buffer;
    const uploadResult = await uploadToCloudinary(imageBuffer);

    const newPost = await Post.create({
      caption: post?.caption,
      image: uploadResult.secure_url,
      cloudinary_id: uploadResult.public_id,
      author: user?.id,
    });

    res
      .status(201)
      .json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ message: error.message });
  }
}
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ message: error.message });
  }
}
