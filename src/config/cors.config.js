const originList = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

export const corsConfig = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman) or if in our whitelist
    if (!origin || originList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "DELETE", "GET"],
  credentials: true,
};
