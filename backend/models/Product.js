const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true, // Example: "100ml"
  },
  quantity: {
    type: Number,
    required: true,
    default: 0, // Total stock available
  },
  scent: {
    type: String,
    enum: ["fruity", "floral", "woody"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  promotion: {
    type: Boolean,
    default: false, // Whether the product is on promotion
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Keeps track of available stock
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;