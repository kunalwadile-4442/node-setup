// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controllers/categoryController");
const { protect } = require("../middlewares/auth");

router.post("/", protect, createCategory); // Admin only if needed
router.get("/", getAllCategories); // Public

module.exports = router;