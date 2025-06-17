const mongoose = require("mongoose")

/**
 * Connect to MongoDB database
 * @returns {Promise} MongoDB connection promise
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are no longer needed in Mongoose 6+
      // but kept for compatibility with older versions
    })

    console.log(`MongoDB Connected Succesfull!!!: ${conn.connection.host}`)

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected")
    })

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close()
      console.log("MongoDB connection closed through app termination")
      process.exit(0)
    })
  } catch (error) {
    console.error("Database connection failed:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB
