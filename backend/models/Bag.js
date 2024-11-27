const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bagSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity for a new item
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0, // Total cost of the bag items
  },
});

const Bag = mongoose.model("Bag", bagSchema);
module.exports = Bag;