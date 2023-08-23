const ToDo = require("../models/ToDoModel");

const displayTasks = async (req, res) => {
  const taskDetails = await ToDo.find({ user: req.user._id });
  res.json(taskDetails);
};

const addNewTask = async (req, res) => {
  const { task } = req.body;
  const todo = await new ToDo({ user: req.user._id, task });
  todo.save();
  res.json(todo);
};
const updateTask = async (req, res) => {
  // const taskDetails = await ToDo.find({user: req.user._id})
  const taskId = req.params.id;
  const taskData = await ToDo.findById(taskId);
  if (taskData) {
    taskData.complete = !taskData.complete;
    taskData.save();
    res.json(taskData);
  } else {
    
  }
};
const updateTaskDetail = async (req, res) => {
  // const taskDetails = await ToDo.find({user: req.user._id})
  const taskId = req.params.id;
  const {updateTask} = req.body;
  const taskData = await ToDo.findById(taskId);
  if (taskData && updateTask) {
    taskData.task = updateTask;
    taskData.save();
    res.json(taskData);
  } else {
    console.log('Task not found')
  }
};
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await ToDo.findByIdAndDelete(taskId);
    res.json(task)
  } catch (error) {
    console.log("Error Occured");
  }
};

module.exports = { addNewTask, updateTask, deleteTask, displayTasks, updateTaskDetail };
