const { asyncHandler } = require("../middlewares/errorHandler");
const Product = require("../models/Product");
const {
  getAllProductsService,
} = require("../services/productService");

const Category = require("../models/Category");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    imageUrl,
    category,
    subcategory,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !price ||
    !imageUrl ||
    !description ||
    !category ||
    !subcategory
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: name, price, imageUrl, description, category, subcategory",
    });
  }

  // ✅ Validate category and subcategory from DB
  const foundCategory = await Category.findOne({ name: category });
  if (!foundCategory) {
    return res.status(400).json({ message: "Category not found" });
  }
  if (!foundCategory.subcategories.includes(subcategory)) {
    return res.status(400).json({ message: "Invalid subcategory for this category" });
  }

  // ✅ Create product if validation passes
  const product = await Product.create({
    name,
    price,
    imageUrl,
    description,
    category,
    subcategory,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

/**
 * Get all products
 * @route GET /api/v1/products
 * @access Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const { category, subcategory } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;

  const products = await getAllProductsService(filter);

  res.status(200).json({
    success: true,
    data: products,
  });
});

/**
 * Get single product by ID
 * @route GET /api/v1/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
});

/**
 * Update product (only by owner or admin)
 * @route PUT /api/v1/products/:id
 * @access Private
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  if (
    product.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  const fieldsToUpdate = [
    "name",
    "price",
    "description",
    "imageUrl",
    "category",
    "subcategory",
    "quantity",
  ];
  fieldsToUpdate.forEach((field) => {
    if (req.body[field]) product[field] = req.body[field];
  });

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated",
    data: product,
  });
});

/**
 * Delete product (only by owner or admin)
 * @route DELETE /api/v1/products/:id
 * @access Private
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  if (
    product.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
