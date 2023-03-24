const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:String,
    type:String,
    assignee:String,
    status:String,
    userID:String,
    sprintID:String
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
    TaskModel
}

