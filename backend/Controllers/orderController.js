const Order = require("../models/Order");
const Product = require("../models/Product");

// Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "userName email") // Fetch user info
      .populate("products.productId", "name price stock"); // Fetch product details

    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// Update order status and adjust product stock
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status || status !== "confirmed") {
      return res.status(400).json({ msg: "Invalid or unsupported status update" });
    }

    // Find the order by ID
    const order = await Order.findById(orderId).populate("products.productId", "stock");
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Update the order status to "confirmed"
    order.status = "confirmed";
    await order.save();

    // Adjust product stock based on order items
    for (const product of order.products) {
      const productToUpdate = await Product.findById(product.productId);
      if (!productToUpdate) {
        console.error(`Product with ID ${product.productId} not found`);
        continue;
      }

      if (productToUpdate.stock < product.quantity) {
        return res.status(400).json({
          msg: `Not enough stock for product: ${productToUpdate.name}`,
        });
      }

      // Subtract the purchased quantity from the stock
      productToUpdate.stock -= product.quantity;
      await productToUpdate.save();
    }

    res.status(200).json({ msg: "Order confirmed and stock updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};