const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: 'Token expired'
        });
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

module.exports = errorHandler;
