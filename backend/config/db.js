const mongoose = require('mongoose');

const databaseConnection = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,);
        console.log(`MongoDB Database Connected : ${connection.connection.host}`)
    } 
    
    catch (error) {
        console.log(`error : ${error}`)
        process.exit();
    }
}

module.exports = databaseConnection;