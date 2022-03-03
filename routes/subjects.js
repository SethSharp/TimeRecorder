const express = require("express");
const router = express.Router();
const Subject = require("../models/subject")
// All subjects
router.get("/", (req, res) => {
  res.render("subjects/index", { subject: new Subject() });
});

// Create a new subject
router.post("/", async (req, res) => {
    const subject = new Subject({title:req.body.title})
    try {
        const newSubject = await subject.save()
        console.log("Success");
        res.redirect("subjects");
    } catch {
        res.render("subjects/index", {
          subject: subject,
          errorMessage: "Error in creating subject",
        });
    }
})



module.exports = router;
