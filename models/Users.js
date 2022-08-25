const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    // minlength: 8,
  },
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
