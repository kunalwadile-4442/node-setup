const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middlewares/auth");

const router = express.Router();

// Public Routes
router.get("/", getAllProducts);           // GET all products
router.get("/:id", getProductById);        // GET single product by ID

// Protected Routes (authenticated users only)
router.post("/", protect, createProduct);  // Create a product
router.put("/:id", protect, updateProduct); // Update product
router.delete("/:id", protect, deleteProduct); // Delete product

module.exports = router;