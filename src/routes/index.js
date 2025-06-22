const express = require("express")
const userRoutes = require("./userRoutes")
const productRoutes = require("./productRoutes")
const apiTesterRoute = require("./apiTesterRoute")

const router = express.Router()

/**
 * Mount all API routes
 */
router.use("/users", userRoutes)
router.use("/products", productRoutes)

/**
 * API v1 info endpoint
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Node.js REST API v1",
    version: "1.0.0",
    documentation: "/api-tester",
    endpoints: {
      users: "/api/v1/users",
      products: "/api/v1/products",
      health: "/health",
      apiTester: "/api-tester",
    },
  })
})

module.exports = router
