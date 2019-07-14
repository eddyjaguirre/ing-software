const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.post("/get", (req, res) => {
  User.find({nivelUsuario: 1})
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
})

router.post("/nombres", (req, res) => {
  User.find({nivelUsuario: 1}, {_id:1, "datosPersonales.nombre":1})
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
})

module.exports = router;