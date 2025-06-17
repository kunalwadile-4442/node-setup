const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const connectDB = require("./config/db")
const { errorHandler, notFound } = require("./middlewares/errorHandler")

// Route imports
const userRoutes = require("./routes/userRoutes")

// Connect to database
connectDB()

const app = express()

/**
 * Security Middleware
 */
// Set security headers
app.use(helmet())

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
})
app.use("/api/", limiter)

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
})
app.use("/api/v1/users/login", authLimiter)
app.use("/api/v1/users/register", authLimiter)

/**
 * Body Parser Middleware
 */
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

/**
 * Logging Middleware
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
  console.log("morgan logging enabled in dev mode")
} else {
  app.use(morgan("combined"))
    console.log("morgan logging enabled in combined mode")

}

/**
 * Health Check Route
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

/**
 * API Routes
 */
app.use("/api/v1/users", userRoutes)

// API documentation route (placeholder)
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Node.js REST API v1",
    version: "1.0.0",
    endpoints: {
      users: "/api/v1/users",
      health: "/health",
    },
  })
})

/**
 * Error Handling Middleware
 */
app.use(notFound) // Handle 404 errors
app.use(errorHandler) // Global error handler

/**
 * Start Server
 */
const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}
📱 Health check: http://localhost:${PORT}/health
📚 API v1: http://localhost:${PORT}/api/v1
  `)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled Rejection:", err.message)
  // Close server & exit process
  server.close(() => {
    process.exit(1)
  })
})

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err.message)
  process.exit(1)
})

module.exports = app
