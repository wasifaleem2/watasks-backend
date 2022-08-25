const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
// import model
const TaskModel = require("../models/Tasks");

exports.AddTask = async (req, res) => {
  // const userEmail = req.body.userEmail;
  // const title = req.body.title;
  // const date = req.body.date;
  // const time = req.body.time;
  // const description = req.body.description;
  try {
    const userEmail = req.body.userEmail;
    const title = req.body.title;
    const date = req.body.date;
    const time = req.body.time;
    const description = req.body.description;
    const isCompleted = req.body.isCompleted;
    if (!title || !date) {
      return res
        .status(406)
        .json({ msg: "need to enter all fields", status: "error" });
    }

    const taskData = new TaskModel({
      userEmail,
      title,
      date,
      time,
      description,
      isCompleted,
    });

    await taskData.save();
    res.json({
      userEmail,
      title,
      date,
      time,
      description,
      status: "success",
      msg: "Task Added Successfully",
    });
  } catch (error) {
    res.status(406).json({ status: "error", msg: "error saving task" });
  }
};

exports.FetchPendingTasks = async (req, res) => {
  const { userEmail } = req.params;
  TaskModel.find(
    { userEmail: userEmail, isCompleted: false },
    (err, allTasks) => {
      if (err) {
        res.send(err, { status: "error", msg: "error fetching list" });
      } else {
        res.json({
          status: "success",
          allTasks,
        });
      }
    }
  );
};
exports.FetchCompletedTasks = async (req, res) => {
  const { userEmail } = req.params;
  TaskModel.find(
    { userEmail: userEmail, isCompleted: true },
    (err, allTasks) => {
      if (err) {
        res.send(err, { status: "error", msg: "error Fetching list" });
      } else {
        res.json({
          status: "success",
          allTasks,
        });
      }
    }
  );
};
// exports.FetchTasks = async (req, res) => {
//   const { userEmail } = req.params;
//   TaskModel.find({ userEmail: userEmail, isCompleted:false }, (err, unDoneTasks) => {
//     if (err) {
//       res.send(err);
//     }
//     else{
//       res.json(unDoneTasks);
//     }
//   });
//   TaskModel.find({ userEmail: userEmail, isCompleted:true }, (err, doneTasks) => {
//     if (err) {
//       res.send(err);
//     }
//     else{
//       res.json(doneTasks);

//     }
//   });
// };

exports.DeleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndRemove(id).exec();
    res.json({ status: "error", msg: "Task Deleted" });
  } catch (error) {
    return res.status(406).json({ status: "error", msg: "error saving task" });
  }
};
exports.UpdateTask = async (req, res) => {
  const id = req.params.id;
  const date = req.body.newDate;
  const time = req.body.newTime;

  try {
    await TaskModel.findById(id, (error, taskUpdate) => {
      taskUpdate.date = date;
      taskUpdate.time = time;
      taskUpdate.save();
      res.json({ status: "success", msg: "Whoa! Task Done" });
    });
  } catch (err) {
    console.log(err, { status: "error", msg: "Problem occurs" });
  }
};
exports.TaskComplete = async (req, res) => {
  const id = req.params.id;
  //current date
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
  var date = year + "-" + month + "-" + day;
  //current time
  var hours = date_ob.getHours();
  var minutes = date_ob.getMinutes();
  var seconds = date_ob.getSeconds();

  var time = hours + ":" + minutes;

  try {
    await TaskModel.findById(id, (error, taskDone) => {
      taskDone.isCompleted = true;
      taskDone.date = date;
      taskDone.time = time;
      taskDone.save();
      res.json({ status: "success", msg: "whoa! It's Done" });
    });
  } catch (err) {
    console.log(err);
  }
};
// try {
//   const id = req.params.id;
//   const status = true;
//   await TaskModel.findById(id, (error, findTask) => {
//     findTask.isCompleted = status;
//   });
// } catch (error) {
//   return res.status(406).json({ err: "status not updated" });
// }
// };
