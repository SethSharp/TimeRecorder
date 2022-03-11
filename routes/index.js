const express  = require("express")
const router = express.Router()
const Subject = require("../models/subject")

router.get("/", async (req, res) => {
    try {
        const subjects = await Subject.find({})
        res.render("index", {
          subjects: subjects
        });
    } catch {
        res.redirect("/")
    }
    
})

router.post("/saveTime", async (req, res) => {
    var time = parseInt(req.body.time);
    console.log(time)
    var condition = { title: req.body.subjectID };
    var update = { $inc: { timeSpent: time } };
    Subject.updateOne(condition, update, (err, subject) => {
        if (err) {
            console.log(err)
        } else {
            res.json(subject)
        }
    });
})
module.exports = router