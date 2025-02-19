module.exports = {
    env: 'production',
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    frontend: {
        url: process.env.FRONTEND_URL || 'https://bikeride.yourdomain.com'
    },
    socket: {
        cors: {
            origin: process.env.FRONTEND_URL || 'https://bikeride.yourdomain.com',
            methods: ['GET', 'POST']
        }
    },
    security: {
        rateLimitWindow: 15 * 60 * 1000, // 15 minutes
        rateLimitMax: 100 // 100 requests per window
    }
};
