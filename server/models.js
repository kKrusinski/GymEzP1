const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  weight: {
    type: Number,
  },
  record: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
