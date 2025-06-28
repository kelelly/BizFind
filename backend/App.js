// backend/app.js

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const winston = require("winston");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware
app.use(helmet()); // Set security-related HTTP headers
app.use(compression()); // Enable GZIP compression
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Update with your frontend URL
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev")); // HTTP request logging

// Setup logging with winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
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
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// Import route modules
const authRoutes = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");
const locationRoutes = require("./routes/locationRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Apply routes
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("BizFind Server");
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Unhandled promise rejections and uncaught exceptions
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

const startServer = async () => {
  try {
    await app.listen(PORT, HOST);
    logger.info(`Server is running on http://${HOST}:${PORT}/`);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
