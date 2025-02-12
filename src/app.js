// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const config = require('./config');
const requestLogger = require('./middleware/requestLogger');

// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app = express();

// Add request logger middleware
app.use(requestLogger);

// Add timeout middleware
app.use((req, res, next) => {
    res.setTimeout(config.apiTimeout, () => {
        res.status(408).send('Request Timeout');
    });
    next();
});

// Add logging middleware for debug level
app.use((req, res, next) => {
    if (config.shouldLog('debug')) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
});

// Use JSON middleware for parsing JSON bodies
app.use(express.json());

// Register routes
app.use('/', routes);

// Start the server
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log(`Log Level: ${config.logLevel}`);
    console.log(`API Timeout: ${config.apiTimeout}ms`);
});

// Export app for testing purposes
module.exports = app;