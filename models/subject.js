const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timeSpent: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Subject", subjectSchema)