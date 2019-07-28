const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Servicio = require("../../models/Servicio");

router.post("/get-list", (req, res) => {
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

router.post("/get", (req, res) => {
  User.find({_id: req.body._id})
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
})

router.post("/pendientes", (req, res) => {
  Servicio.find({tecnico_id: req.body.tecnico_id, entregado: false})
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
})

module.exports = router;