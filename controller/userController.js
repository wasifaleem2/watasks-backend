const express = require("express");
const app = express();
app.use(express.json());
// import bcrypt encryption
const bcrypt = require("bcrypt");
// import jwt authentication
const jwt = require("jsonwebtoken");
// import models
const UserModel = require("../models/Users");

exports.registerUser = async (req, res) => {
  try {
    const email = req.body.userEmail;
    const name = req.body.name;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!email || !password || !confirmPassword || !name) {
      return res
        .status(406)
        .json({ status: "error", msg: "need to enter all fields" });
    }
    //finding user with email
    const foundUser = await UserModel.find({ email });
    if(foundUser.length > 0){
      return res
        .status(406)
        .json({ status: "error", msg: "email already exist. Try different email" });
    }
    if (password.length < 8) {
      return res
        .status(406)
        .json({ status: "error", msg: "password must be atleast 8 characters long " });
    }
    if (password != confirmPassword) {
      return res
        .status(406)
        .json({ status: "error", msg: "passwords doesnot match" });
    }
    

    // //   bycrypt password
    let hash = await bcrypt.hashSync(password, 10);
    const user = new UserModel({
      email: email,
      name: name,
      password: hash,
      confirmPassword: confirmPassword,
    });
    await user.save();
    res.json({
      email,
      name,
      status: "success",
      msg: `Thankyou! ${name}, you have registered Successfully, Signin to continue`,
    });
  } catch (error) {
    res.status(406).json({ status: "error", msg: "error while registration" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.userEmail;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(406).json({status: "error", msg: "need to enter both email & password" });
    }

    //finding user with phone
    const user = await UserModel.findOne({ email });

    if (!user)
      return res
        .status(406)
        .json({ status: "error", msg: "no account with this email" });

    //checking password over bcrypt password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(406).json({status:"error", msg: "Invalid Credentials" });

    // creating jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      status: "success",
      msg: "Login Successfully",
      email: user.email,
      name: user.name,
      password: user.password,
      token,
    });
  } catch (error) {
    res.status(406).json({ status: "error", msg: "Try Again. Some propblem occurs" });
  }
};
