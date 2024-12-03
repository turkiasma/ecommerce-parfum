const express = require("express");
const userRoute = express.Router();
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
  signIn,
  logout,
} = require("../Controllers/userController");
const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");
userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth, isAutho(["user"]), getOneUser);
userRoute.post("/users", postUser);
userRoute.put("/users/:id", putUser);
userRoute.delete("/users/:id", isAuth, isAutho(["admin"]), deleteUser);
userRoute.post("/signIn", signIn), userRoute.post("/logout", logout);

module.exports = userRoute;

// Import the controller functions from the user controller file.
// These functions define the logic that will be executed when a route is
