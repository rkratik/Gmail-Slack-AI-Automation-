// Backend Middleware - Error Handler
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error('[ERROR]', {
    status,
    message,
    path: req.path,
    method: req.method,
    timestamp: new Date(),
  });

  res.status(status).json({
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = { errorHandler };
