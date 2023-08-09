const ToDo = require("../models/ToDoModel");

const displayTasks = async (req, res) => {
    const taskDetails = await ToDo.find({user: req.user._id})
    res.json(taskDetails) 

}

const addNewTask = async (req, res) => {
    const {task} = req.body;
    const todo = await new ToDo({user: req.user._id, task})
    todo.save()
    res.json(todo)  

}
const updateTask = async ( req, res) => {
    const taskId = req.params.id;
    const {updatedTaskDetail} = req.body
    const taskData = await ToDo.findById(taskId)
    taskData.task =  updatedTaskDetail
    taskData.complete = !taskData.complete
    taskData.save();
    res.send(taskData)
    
}
const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try{
        await ToDo.findByIdAndDelete(taskId)
    } catch (error) {
        console.log("Error Occured")
    }
}

module.exports = {addNewTask,updateTask,deleteTask,displayTasks}