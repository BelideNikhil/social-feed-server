import dns from "node:dns";
import { configDotenv } from "dotenv";
import { app } from "./src/app.js";
import cors from "cors";
import { connectWithDb } from "./src/db/db.js";
import { postRouter } from "./src/routes/post.routes.js";
import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./src/routes/auth.routes.js";
import { corsConfig } from "./src/config/cors.config.js";
import helmet from "helmet";
import { cloudinaryConfigConnect } from "./src/config/cloudinary.js";
// Force Node to use Google's DNS instead of your router/ISP
dns.setServers(["8.8.8.8", "8.8.4.4"]);

configDotenv({
  path: ".env.local",
});
cloudinaryConfigConnect();

connectWithDb();

// MIDDLEWARE
app.use(helmet()); // This adds approx 15 security headers to protect our server
app.use(cors(corsConfig));
app.use(cookieParser()); // to parse i.e read cookie data on broswer request..cookies
app.use(express.json()); // to parse/ read JSON data on request body
// ROUTES
app.use("/api/posts", postRouter);
app.use("/api/auth", authRoutes);
//
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up on ${port}`));
