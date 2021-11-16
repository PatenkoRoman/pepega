export function loggerMiddleware(req, res, next) {
  console.info(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
};
