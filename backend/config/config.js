// config.js

const config = {
  PORT: process.env.PORT || 3000,
  HERE_MAPS_API_KEY: process.env.HERE_MAPS_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-default-secret',
};

module.exports = config;
