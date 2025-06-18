const userService = require("../services/userService")
const { asyncHandler } = require("../middlewares/errorHandler")

/**
 * User Controller
 * Handles HTTP requests and responses for user operations
 */

/**
 * @desc    Register a new user
 * @route   POST /api/v1/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const result = await userService.registerUser(req.body)

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  })
})

/**
 * @desc    Login user
 * @route   POST /api/v1/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const result = await userService.loginUser(req.body)

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  })
})

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.user._id)

  res.status(200).json({
    success: true,
    message: "User profile retrieved successfully",
    data: { user },
  })
})

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateUserProfile(req.user._id, req.body)

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: { user },
  })
})

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const options = {
    page: req.query.page,
    limit: req.query.limit,
    sort: req.query.sort,
    search: req.query.search,
  }

  const result = await userService.getAllUsers(options)

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result,
  })
})

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id)

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  })
})

/**
 * @desc    Logout user (client-side token removal)
 * @route   POST /api/v1/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  // In a stateless JWT system, logout is typically handled client-side
  // by removing the token. This endpoint can be used for logging purposes.

  res.status(200).json({
    success: true,
    message: "Logout successful.",
  })
})

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  logoutUser,
}
