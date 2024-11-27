var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
  },
  age: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Password is required for authentication
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;