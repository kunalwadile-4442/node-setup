const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      maxlength: [500, "Max 500 characters allowed"],
    },
    price: {
      type: Number,
      required: [true, "Enter price"],
    },
    imageUrl:{
        type:String,
        required:[true, "PLease upload a image"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
