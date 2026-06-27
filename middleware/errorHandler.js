const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || err.statusCode || 500;

    console.error(`[ERROR] ${req.method} ${req.originalUrl} → ${statusCode}: ${err.message}`);

    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

module.exports = errorHandler;