const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default : false,
    },
    user :{
      type:mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User",
    }
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model('ToDo', ToDoSchema)

module.exports = ToDo;
