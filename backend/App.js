const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const winston = require('winston');
const session = require('express-session');
const { getSessionSecret } = require('./utils/auth');

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Setup logging with winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let log = `${timestamp} [${level}]: ${message}`;
      if (Object.keys(meta).length) {
        log += ` | meta: ${JSON.stringify(meta)}`;
      }
      return log;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Session management setup
app.use(session({
  secret: getSessionSecret(), // Use the secret from the utils
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }, // Use secure cookies in production
}));

// Import route modules
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const locationRoutes = require('./Routes/locationRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/product', productRoutes);
app.use('/api/review', reviewRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('BizFind Server');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const startServer = async () => {
  try {
    await app.listen(PORT, HOST);
    logger.info(`Server is running on http://${HOST}:${PORT}/`);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
