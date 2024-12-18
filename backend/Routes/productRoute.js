const express = require("express");
const productRouter = express.Router();
const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");
const productController = require("../Controllers/productController");

// Route to get all products (accessible to all users)
productRouter.get("/products", productController.getAllProducts);

// Route to create a product (admin only)
productRouter.post("/products", isAuth, isAutho(['admin']), productController.postProduct);

// Route to delete a product by ID (admin only)
productRouter.delete("/products/:id", isAuth, isAutho(['admin']), productController.deleteProduct);

// Route to update a product by ID (admin only)
productRouter.put("/products/:id", isAuth, isAutho(['admin']), productController.putProduct);

module.exports = productRouter;
