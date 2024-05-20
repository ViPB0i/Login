const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 15,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", userSchema);
