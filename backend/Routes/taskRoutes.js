const express = require('express');
const { addNewTask, updateTask, deleteTask, displayTasks } = require('../Controllers/taskControllers');
const {protect} = require('../middlewares/authMiddleWare');
const taskRouter  = express.Router();

taskRouter.route('/').get(protect,displayTasks);
taskRouter.route('/newtask').post(protect,addNewTask);
taskRouter.route('/updatetask/:id').put(updateTask);
taskRouter.route('/deletetask').delete(deleteTask)

module.exports = taskRouter