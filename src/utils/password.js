const bcrypt = require("bcryptjs")

/**
 * Hash a password
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
  const saltRounds = Number.parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} - True if password matches
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

/**
 * Generate a random password
 * @param {number} length - Password length (default: 12)
 * @returns {string} - Random password
 */
const generateRandomPassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let password = ""

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return password
}

module.exports = {
  hashPassword,
  comparePassword,
  generateRandomPassword,
}
