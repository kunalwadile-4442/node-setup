const Product = require("../models/Product");

/**
 * Create a new product
 */
const createProductService = async ({
  name,
  price,
  description,
  imageUrl,
  category,
  subcategory,
  userId,
}) => {
  return await Product.create({
    name,
    price,
    description,
    imageUrl,
    category,
    subcategory,
    user: userId,
  });
};

/**
 * Get all products
 */
const getAllProductsService = async (filter = {}) => {
  return await Product.find(filter).populate("user", "name email");
};


/**
 * Get a product by ID
 */
const getProductByIdService = async (id) => {
  return await Product.findById(id);
};

/**
 * Update product by ID
 */
const updateProductService = async (id, updatedFields, currentUser) => {
  const product = await Product.findById(id);
  if (!product) return null;

  // Allow only owner or admin to update
  if (product.user.toString() !== currentUser._id.toString() && currentUser.role !== "admin") {
    throw new Error("Not authorized");
  }

  Object.assign(product, updatedFields);
  await product.save();
  return product;
};

/**
 * Delete product by ID
 */
const deleteProductService = async (id, currentUser) => {
  const product = await Product.findById(id);
  if (!product) return null;

  // Allow only owner or admin to delete
  if (product.user.toString() !== currentUser._id.toString() && currentUser.role !== "admin") {
    throw new Error("Not authorized");
  }

  await product.deleteOne();
  return true;
};

module.exports = {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};