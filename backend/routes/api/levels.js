const express = require("express");
const router = express.Router();

const Level = require("../../models/Levels");

router.post("/", (req, res) => {
  Level.find()
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
})

module.exports = router;