const mongoose = require("mongoose")

const sprintSchema = mongoose.Schema({
    title:String,
    status:Boolean,
    userID:String,
})

const SprintModel = mongoose.model("sprint", sprintSchema)

module.exports = {
    SprintModel
}

