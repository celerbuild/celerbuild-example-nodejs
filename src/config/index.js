const config = {
    port: process.env.PORT || 8082,
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    apiTimeout: parseInt(process.env.API_TIMEOUT || 5000),
    version: '1.0.1',
};

// Add helper methods
config.isProduction = config.nodeEnv === 'production';
config.isDevelopment = config.nodeEnv === 'development';
config.shouldLog = (level) => {
    const levels = {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    };
    return levels[config.logLevel] >= levels[level];
};

module.exports = config;