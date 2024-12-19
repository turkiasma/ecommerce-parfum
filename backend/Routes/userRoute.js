const express = require("express");
const userRoute = express.Router();
const {
  postUser,
  signIn,
  logout,
} = require("../Controllers/userController");

userRoute.post("/users", postUser);
userRoute.post("/signIn", signIn);
userRoute.post("/logout", logout);


module.exports = userRoute;

// Import the controller functions from the user controller file.
// These functions define the logic that will be executed when a route is
