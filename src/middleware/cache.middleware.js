export const preventCachingMiddleware = (req, res, next) => {
  res.header({
    "Cache-Control": "no-store,no-cache,must-validate,proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  next();
};
