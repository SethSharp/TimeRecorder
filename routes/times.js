const express = require("express");
const router = express.Router();
const Subject = require("../models/subject")
// All subjects
router.get("/", async (req, res) => {
  try {
    const allSubs = await Subject.find({}) 
    res.render("times/index", {subjects:allSubs});
  } catch {
    res.render("index")
  }
});

module.exports = router