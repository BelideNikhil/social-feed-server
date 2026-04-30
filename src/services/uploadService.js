import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "posts" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    stream.end(buffer);
  });
}
