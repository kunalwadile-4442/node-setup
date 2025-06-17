const User = require("../models/User")
const { generateToken } = require("../utils/jwt")

/**
 * User Service Layer
 * Contains business logic for user operations
 */
class UserService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - Created user and token
   */
  async registerUser(userData) {
    const { name, email, password } = userData

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error("User already exists with this email")
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    })

    // Generate token
    const token = generateToken(user._id)

    return {
      user: user.toSafeObject(),
      token,
    }
  }

  /**
   * Authenticate user login
   * @param {Object} loginData - User login credentials
   * @returns {Promise<Object>} - User and token
   */
  async loginUser(loginData) {
    const { email, password } = loginData

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      throw new Error("Invalid email or password")
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error("Account is deactivated")
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw new Error("Invalid email or password")
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    return {
      user: user.toSafeObject(),
      token,
    }
  }

  /**
   * Get user profile
   * @param {string} userId - User ID
   * @returns {Promise<Object>} - User profile
   */
  async getUserProfile(userId) {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    return user.toSafeObject()
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} - Updated user
   */
  async updateUserProfile(userId, updateData) {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    // Update allowed fields
    const allowedUpdates = ["name", "email"]
    const updates = {}

    allowedUpdates.forEach((field) => {
      if (updateData[field] !== undefined) {
        updates[field] = updateData[field]
      }
    })

    // Check if email is being updated and if it's already taken
    if (updates.email && updates.email !== user.email) {
      const existingUser = await User.findOne({ email: updates.email })
      if (existingUser) {
        throw new Error("Email already in use")
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true })

    return updatedUser.toSafeObject()
  }

  /**
   * Get all users (admin only)
   * @param {Object} options - Query options (page, limit, sort)
   * @returns {Promise<Object>} - Users list with pagination
   */
  async getAllUsers(options = {}) {
    const { page = 1, limit = 10, sort = "-createdAt", search = "" } = options

    const skip = (page - 1) * limit

    // Build search query
    const searchQuery = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
        }
      : {}

    // Get users with pagination
    const users = await User.find(searchQuery).sort(sort).skip(skip).limit(Number.parseInt(limit)).select("-password")

    const total = await User.countDocuments(searchQuery)

    return {
      users,
      pagination: {
        currentPage: Number.parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    }
  }

  /**
   * Delete user account
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    await User.findByIdAndDelete(userId)
  }
}

module.exports = new UserService()
