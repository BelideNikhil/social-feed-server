import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    caption: String,
    image: String,
    //  we need this cloudinary_id, when user deletes a post, we can remove that image from cloudinary as well.
    // this saves cloud space// it's a good practice
    cloudinary_id: String,
    author: {
      // this tells mongoose that type is special id// the same special id which mongoose creates
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // this tells which collection the special id belongs to
    },
  },
  //   timestamps:true, mongoose auto handles createdAt & updatedAt
  { timestamps: true },
);
export const Post = mongoose.model("Post", postSchema);
