const express  = require("express")
const router = express.Router()
const Subject = require("../models/subject")

router.get("/", async (req, res) => {
    try {
        const subjects = await Subject.find({})
        res.render("index", {
          subjects: subjects,
        });
    } catch {
        console.log("EOROROR")
        res.redirect("/")
    }
    
})

module.exports = router