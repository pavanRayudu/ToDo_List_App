const express = require('express');
const databaseConnection = require('./config/db')
const userRouter = require('./Routes/userRoutes');
const taskRouter = require('./Routes/taskRoutes');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();
app.use(cors());
dotenv.config();
databaseConnection();
app.use(express.json())


app.use('/',userRouter);
app.use('/dashboard',taskRouter)
app.use(notFound);
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server Started on Port : ${port}`)
})