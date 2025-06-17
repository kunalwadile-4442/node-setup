const jwt = require("jsonwebtoken")

/**
 * Generate JWT token
 * @param {string} userId - User ID to encode in token
 * @returns {string} - JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
    issuer: "nodejs-rest-api",
    audience: "api-users",
  })
}

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

/**
 * Generate refresh token (longer expiry)
 * @param {string} userId - User ID to encode in token
 * @returns {string} - Refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId, type: "refresh" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
    issuer: "nodejs-rest-api",
    audience: "api-users",
  })
}

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
}
