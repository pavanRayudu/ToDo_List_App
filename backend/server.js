const express = require('express');
const databaseConnection = require('./config/db')
const userRouter = require('./Routes/userRoutes');
const taskRouter = require('./Routes/taskRoutes');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');
const path = require('path');
const process = require('process')
const { error } = require('console');

const app = express();
app.use(cors());
dotenv.config();
databaseConnection();
app.use(express.json())


app.use('/',userRouter);
app.use('/dashboard',taskRouter);

//--------------Deployment-----------------
process.chdir('../');
__dirname = process.cwd()
console.log(__dirname)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res) => 
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    )

} else {
    console.log('error')
}


//-----------------------------------------
app.use(notFound);
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server Started on Port : ${port}`)
})