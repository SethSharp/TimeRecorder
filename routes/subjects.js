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
        res.render("subjects/index", {
          subject: new Subject(),
          msg: "Created subject: " + req.body.title,
        });
    } catch {
        res.render("subjects/index", {
          subject: new Subject(),
          msg: "Error in creating subject",
        });
    }
})

router.post("/edit", async (req, res) => {
  try {
    const query = {title: req.body.title[0]}
    const editSub = await Subject.updateOne(query, {title:req.body.title[1]})
    res.redirect("/subjects")
  } catch {
    res.render("/subjects", {
      subject: new Subject(),
      errorMessage: "Unable to edit"
    })
  }
})

router.post("/delete", async (req, res) => {
  try {
    const delSub = await Subject.deleteOne({title:req.body.title})
    res.redirect("/subjects");
  } catch {
    res.render("subjects/index", {
      subject: new Subject(),
      errorMessage: "Error in deleting subject"
    })
  }
})


module.exports = router;
