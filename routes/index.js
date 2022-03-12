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
    try {
        const selectedSubject = await Subject.findOne({title:req.body.subjectID})
        var condition = { title: req.body.subjectID };
        
        console.log(req.body)
        
        // MAY INCREASE M,S OVER 60
        var hours = parseInt(req.body.hours)
        var minutes = parseInt(req.body.minutes)
        var seconds = parseInt(req.body.seconds)

        if (selectedSubject.seconds+seconds >= 60) {
            seconds-=60
            minutes++
        }
        if (selectedSubject.minutes+minutes >= 60) {
            minutes-=60
            hours++
        }

        var update = {
        $inc: {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        },
        };
        await Subject.updateOne(condition, update)
    } catch {
        res.redirect("index")
    }
    
})
module.exports = router