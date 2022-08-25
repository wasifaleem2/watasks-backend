const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  isCompleted: {
    type: String,
    required: true,
  },
});
const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
