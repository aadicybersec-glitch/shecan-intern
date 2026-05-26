// 404 Route Not Found Interceptor
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - [${req.method}] ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Centralized Error Dispatcher
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  
  res.json({
    message: err.message,
    // Hide diagnostic traces in production
    stack: process.env.NODE_ENV === "production" ? "🥞 Protected" : err.stack
  });
};
