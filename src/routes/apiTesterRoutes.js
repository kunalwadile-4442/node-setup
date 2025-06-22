const express = require("express")
const path = require("path")
const router = express.Router()

/**
 * @desc    Serve API Tester Interface
 * @route   GET /api-tester
 * @access  Public
 */
router.get("/", (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../public/index.html")
    res.sendFile(filePath)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not load API tester interface",
      error: error.message,
    })
  }
})

/**
 * @desc    Get API documentation in JSON format
 * @route   GET /api-tester/docs
 * @access  Public
 */
router.get("/docs", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Documentation",
    data: {
      baseUrl: `${req.protocol}://${req.get("host")}`,
      version: "1.0.0",
      endpoints: {
        authentication: [
          {
            method: "POST",
            path: "/api/v1/users/register",
            description: "Register a new user",
            requiresAuth: false,
            body: {
              name: "string (required)",
              email: "string (required, valid email)",
              password: "string (required, min 6 chars)",
            },
          },
          {
            method: "POST",
            path: "/api/v1/users/login",
            description: "Login user and get JWT token",
            requiresAuth: false,
            body: {
              email: "string (required)",
              password: "string (required)",
            },
          },
        ],
        users: [
          {
            method: "GET",
            path: "/api/v1/users/profile",
            description: "Get current user profile",
            requiresAuth: true,
          },
          {
            method: "PUT",
            path: "/api/v1/users/profile",
            description: "Update user profile",
            requiresAuth: true,
            body: {
              name: "string (optional)",
              email: "string (optional, valid email)",
            },
          },
        ],
        products: [
          {
            method: "GET",
            path: "/api/v1/products",
            description: "Get all products with optional filtering",
            requiresAuth: false,
            queryParams: {
              page: "number (optional, default: 1)",
              limit: "number (optional, default: 10)",
              category: "string (optional)",
              search: "string (optional)",
            },
          },
          {
            method: "POST",
            path: "/api/v1/products",
            description: "Create a new product",
            requiresAuth: true,
            body: {
              name: "string (required)",
              description: "string (required)",
              price: "number (required)",
              category: "string (required)",
              inStock: "boolean (optional, default: true)",
            },
          },
        ],
      },
    },
  })
})

module.exports = router
