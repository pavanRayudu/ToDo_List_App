const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const ToDo = require("./models/ToDoModel");

const app = express();
app.use(express.json());
app.use(cors())
mongoose
  .connect("mongodb://127.0.0.1:27017/first-app",
  {
    useNewUrlParser : true,
    useUnifiedTopology: true,
  })
  .then(()=>console.log("connected to database"))
  .catch(console.error);

// Displaying the tasks - GET
app.get('/', async (req,res) => {
    const taskDetails = await ToDo.find()

    res.send(taskDetails)
})

// Adding the new task - POST
app.post('/newtask', async(req,res) => {
    const {task} = req.body;
    const todo = new ToDo({task})
    todo.save()
    res.json(todo)   
})

// Updating the existing task - PUT

app.put('/updatetask/:id' , async(req,res) => {
    const taskId = req.params.id;
    const updatedTask = await ToDo.findById(taskId)
    updatedTask.complete = !updatedTask.complete
    updatedTask.save();
    res.json(updatedTask)
})

// Deleting the task from database - DELETE 

app.delete('/removetask/:id' , async(req, res) => {
    const taskId = req.params.id;
    try{
        await ToDo.findByIdAndDelete(taskId)
    } catch (error) {
        console.log("Error Occured")
    }
})


app.listen(9000, () => {
  console.log("Server connected");
});
