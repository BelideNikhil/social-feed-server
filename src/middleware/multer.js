import multer from "multer";

// this specifies to save payload image in RAM
const storage = multer.memoryStorage();
export const fileParser = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
