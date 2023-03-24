const express = require("express");
const { TaskModel } = require("../Model/Task.model");

const taskRouter = express.Router();


taskRouter.get("/", async (req, res) => {
    const userID = req.body.userID
    const tasks = await TaskModel.find({userID});
    res.send(tasks);
});

taskRouter.post("/", async (req, res) => {
    const payload = req.body
    //get token from header
    //verify token using jwt
    try{
        const new_task = new TaskModel(payload)
        await new_task.save();
        res.send({"msg" : "Task Added successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
});

taskRouter.patch("/:taskID", async (req, res) => {
    const taskID = req.params.taskID
    const userID = req.body.userID
    const task = await TaskModel.findOne({_id:taskID})
    if(userID !== task.userID){
        res.send("Not authorised")
    }
    else{
        await TaskModel.findByIdAndUpdate({_id : taskID},payload)
        res.send({"msg" : "Task updated successfully"})
    }
})

taskRouter.delete("/:taskID", async (req, res) => {
const taskID = req.params.taskID
const userID = req.body.userID
const task = await TaskModel.findOne({_id:taskID})
if(userID !== task.userID){
    res.send("Not authorised")
}
else{
    await TaskModel.findByIdAndDelete({_id : taskID})
    res.send({"msg" : "Task deleted successfully"})
}
})


module.exports = {taskRouter}