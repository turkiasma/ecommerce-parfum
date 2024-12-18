const jwt = require("jsonwebtoken");
require("dotenv").config();
/*imported for jwt  */
const User = require("../models/User");

const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users && users.length > 0) {
      response.status(200).json({ users: users });
    } else {
      response.status(404).json({ msg: "No users found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on getting users" });
  }
};
const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id);
    if (foundUser) {
      res.status(200).json({ user: foundUser });
    } else {
      res.status(404).json({ msg: "No user found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the user" });
  }
};
const bcrypt = require('bcryptjs');

const postUser = async (request, response) => {
  const user = request.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      response.status(400).json({ msg: "User already exists" });
    } else {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      const newUser = new User(user);
      await newUser.save();
      response.status(200).json({ user: newUser, msg: "User successfully added" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on adding user" });
  }
};

const putUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  try {
    await User.findByIdAndUpdate(id, user);
    res.status(200).json({ msg: "update success" });
  } catch (error) {
    res.status(500).json({ msg: "error on updating user" });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting user" });
  }
};

/*sign inn */
const signIn = async (req, res) => {
  const user = req.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(user.password, foundUser.password);
      if (isMatch) {
        const token = jwt.sign(
          { id: foundUser._id, role: foundUser.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Set the cookie with the token
        res.cookie("authToken", token, {
          httpOnly: false,
          secure: false, // Use false for local testing (no HTTPS)
          sameSite: "Strict", // Prevent CSRF attacks
          maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
        });

        return res.status(200).json({ user: foundUser, token });
      } else {
        return res.status(400).json({ msg: "Wrong password" });
      }
    } else {
      return res.status(400).json({ msg: "User not registered" });
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};


const logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ msg: "Logged out successfully" });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
  signIn,
  logout,
};