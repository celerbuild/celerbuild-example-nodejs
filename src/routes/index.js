const express = require('express');
const router = express.Router();
const config = require('../config');

// Root endpoint
router.get('/', (req, res) => {
    res.json({
        message: 'Hello World from CelerBuild!'
    });
});

// Version endpoint
router.get('/version', (req, res) => {
    res.json({
        version: config.version
    });
});

module.exports = router;