const express = require("express")
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  logoutUser,
} = require("../controllers/userController")
const { protect, restrictTo } = require("../middlewares/auth")
const { validate, userValidation } = require("../middlewares/validation")

const router = express.Router()

/**
 * Public Routes
 */
router.post("/register", validate(userValidation.register), registerUser)
router.post("/login", validate(userValidation.login), loginUser)

/**
 * Protected Routes (require authentication)
 */
router.use(protect) // All routes after this middleware require authentication

router.post("/logout", logoutUser)
router.get("/profile", getUserProfile)
router.put("/profile", validate(userValidation.updateProfile), updateUserProfile)


/**
 * Admin Only Routes
 */
router.get("/", restrictTo("admin"), getAllUsers)
router.delete("/:id", restrictTo("admin"), deleteUser)

module.exports = router
