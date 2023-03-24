const express = require("express");
const { SprintModel } = require("../Model/Sprint.model");

const sprintRouter = express.Router();

sprintRouter.get("/", async (req, res) => {
    const userID = req.body.userID
    const sprints = await SprintModel.find({userID});
    res.send(sprints);
});

sprintRouter.post("/", async (req, res) => {
    const payload = req.body;
    //get token from header
    //verify token using jwt
    try{
        const new_sprint = new SprintModel(payload);
        await new_sprint.save();
        res.send({"msg" : "Sprint Added successfully"});
    }
    catch(err){
        console.log(err);
        res.send({"err" : "Something went wrong"});
    }
});

sprintRouter.patch("/:sprintID", async (req, res) => {
    const sprintID = req.params.sprintID
    const userID = req.body.userID
    const sprint = await SprintModel.findOne({_id:sprintID})
    if(userID !== sprint.userID){
        res.send("Not authorised")
    }
    else{
        await SprintModel.findByIdAndUpdate({_id : sprintID},payload)
        res.send({"msg" : "Sprint updated successfully"})
    }
})

sprintRouter.delete("/:sprintID", async (req, res) => {
const sprintID = req.params.sprintID
const userID = req.body.userID
const sprint = await SprintModel.findOne({_id:sprintID})
if(userID !== sprint.userID){
    res.send("Not authorised")
}
else{
    await SprintModel.findByIdAndDelete({_id : sprintID})
    res.send({"msg" : "Sprint deleted successfully"})
}
})


module.exports = {sprintRouter}