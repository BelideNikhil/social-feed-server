export const cookieConfig = {
  httpOnly: true, // Prevents JS access (XSS protection)
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Only sends over HTTPS
  secure: process.env.NODE_ENV === "production", // Prevents CSRF (Cross-Site Request Forgery)
  path: "/", // Always explicitly set path to avoid route-specific cookies (default path is "/")
  // Add this to persist the cookie (e.g., for 7 days)
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
