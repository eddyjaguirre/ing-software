const express = require("express");
const router = express.Router();

const Cliente = require("../../models/Cliente");

router.post("/get-list", (req, res) => {
  Cliente.find()
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
})

router.post("/create", (req, res) => {
  Cliente.findOne({cedula: req.body.cedula}).then(cliente => {
    if (cliente) {
      return res.status(400).json({cedula: 'El cliente ya existe'});
    } else {
      const newCliente = new Cliente({
        juridico: req.body.juridico,
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
      });
      newCliente
        .save()
        .then(cliente => {
          res.json(cliente._id);
          // return res.json(cliente);
        })
        .catch(err => console.log(err));
    }
  })
})

module.exports = router;