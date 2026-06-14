// Backend Middleware - Request Logger
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userId: req.userId || 'anonymous',
    };

    if (res.statusCode >= 400) {
      console.error('[REQUEST ERROR]', log);
    } else {
      console.log('[REQUEST]', log);
    }
  });

  next();
};

module.exports = { requestLogger };
