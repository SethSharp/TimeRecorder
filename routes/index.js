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
    var condition = { title: req.body.subjectID };
    
    
    // MAY INCREASE M,S OVER 60
    
    var update = {
      $inc: {
        hours: req.body.hours,
        minutes: req.body.minutes,
        seconds: req.body.seconds,
      },
    };
    Subject.updateOne(condition, update, (err, subject) => {
        if (err) {
            console.log(err)
        } else {
            res.json(subject)
        }
    });
})
module.exports = router