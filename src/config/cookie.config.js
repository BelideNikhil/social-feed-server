export const cookieConfig = {
  httpOnly: true, // Prevents JS access (XSS protection)
  sameSite: "strict", // Only sends over HTTPS
  secure: process.env.NODE_ENV === "production", // Prevents CSRF (Cross-Site Request Forgery)
  path: "/", // Always explicitly set path to avoid route-specific cookies (default path is "/")
};
