module.exports = {
    apps: [{
        name: "celerbuild-demo",      // Application name
        script: "src/app.js",         // Entry point script
        instances: 1,                 // Number of instances
        autorestart: true,           // Auto restart if app crashes
        watch: false,                // Watch for file changes
        max_memory_restart: "1G",    // Restart if memory exceeds 1G
        env: {                       // Default environment variables
            NODE_ENV: "development",
            PORT: 8082
        },
        env_production: {            // Production environment variables
            NODE_ENV: "production",
            PORT: 8082
        }
    }]
}