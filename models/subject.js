const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        default: 0,
    },
    minutes: {
        type: Number,
        default: 0,
    },
    seconds: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Subject", subjectSchema)