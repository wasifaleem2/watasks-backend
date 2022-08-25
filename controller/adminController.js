const express = require("express");
const app = express();
app.use(express.json());

// import model
const TaskModel = require("../models/Tasks");
const UserModel = require("../models/Users");

exports.AllUsers = async (req, res) => {
  UserModel.find({}, (err, allUsers) => {
    if (err) {
      res.send(err, { status: "error", msg: "error fetching list" });
    } else {
      res.json({
        status: "success",
        msg:"Showing list of all users",
        allUsers,
      });
    }
  });
};
exports.AllTasks = async (req, res) => {
  TaskModel.find(
    {},
    (err, allTasks) => {
      if (err) {
        res.send(err, { status: "error", msg: "error Fetching list" });
      } else {
        res.json({
          status: "success",
          msg:"showing all tasks created",
          allTasks,
        });
      }
    }
  );
};
exports.DeleteByAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.findByIdAndRemove(id).exec();
    res.json({ status: "error", msg: "User Deleted" });
  } catch (error) {
    return res.status(406).json({ status: "error", msg: "error Deleting" });
  }
};