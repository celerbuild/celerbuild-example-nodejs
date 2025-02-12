const requestLogger = (req, res, next) => {
    // Record start time
    const start = Date.now();

    // Get IP address
    const ip = req.ip || req.connection.remoteAddress;

    // Get user agent
    const userAgent = req.get('User-Agent');

    // Log when request ends
    res.on('finish', () => {
        // Calculate duration
        const duration = Date.now() - start;

        // Create log entry
        const logEntry = {
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: ip,
            userAgent: userAgent,
            query: req.query,
            body: req.method !== 'GET' ? req.body : undefined
        };

        // Log based on status code
        if (res.statusCode >= 400) {
            console.error(JSON.stringify(logEntry));
        } else {
            console.log(JSON.stringify(logEntry));
        }
    });

    next();
};

module.exports = requestLogger;