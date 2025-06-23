// controllers/categoryController.js
const Category = require("../models/Category");
const { asyncHandler } = require("../middlewares/errorHandler");

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, subcategories } = req.body;

  if (!name || !Array.isArray(subcategories) || subcategories.length === 0) {
    return res.status(400).json({ message: "Name and subcategories are required" });
  }

  const category = await Category.create({ name, subcategories });
  res.status(201).json({ success: true, data: category });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ success: true, data: categories });
});