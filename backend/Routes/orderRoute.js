const express = require("express");
const orderRouter = express.Router();
const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");
const { getAllOrders, updateOrderStatus } = require("../Controllers/orderController");

// Fetch all orders (admin only)
orderRouter.get("/view", isAuth, isAutho(["admin"]), getAllOrders);

// Update order status (admin only)
orderRouter.put("/:orderId", isAuth, isAutho(["admin"]), updateOrderStatus);

module.exports = orderRouter;
