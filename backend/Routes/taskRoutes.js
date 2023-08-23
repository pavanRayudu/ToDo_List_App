const express = require('express');
const { addNewTask, updateTask, deleteTask, displayTasks, updateTaskDetail } = require('../Controllers/taskControllers');
const {protect} = require('../middlewares/authMiddleWare');
const taskRouter  = express.Router();

taskRouter.route('/').get(protect,displayTasks);
taskRouter.route('/newtask').post(protect,addNewTask);
taskRouter.route('/updatetask/:id').put(updateTask);
taskRouter.route('/updatetaskDetail/:id').put(updateTaskDetail);
taskRouter.route('/deletetask/:id').delete(deleteTask)

module.exports = taskRouter