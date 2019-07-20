const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Factura = require("../../models/Factura");
const Cliente = require("../../models/Cliente");
const Equipo = require("../../models/Equipo");
const Servicio = require("../../models/Servicio");

router.post("/get-paid", (req, res) => {
  Factura.findAll({pagado: true})
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
});

router.post("/get-pending", (req, res) => {
  Factura.findAll({pagado:false, entregado:false})
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
});


router.post("/create", (req, res) => {
  Cliente.findOne({cedula: req.body.clientData.cedula}).then(cliente => {
    if (cliente) {
      const newFactura = new Factura({
        owner_id: cliente._id,
      });
      newFactura.save()
      .then(factura => res.json(factura))
      .catch(err=>console.log(err));
      // return;
    } else {
      const newCliente = new Cliente({
        _id: new mongoose.Types.ObjectId(),
        juridico: req.body.clientData.juridico,
        cedula: req.body.clientData.cedula,
        nombre: req.body.clientData.nombre,
        direccion: req.body.clientData.direccion,
        telefono: req.body.clientData.telefono,
        email: req.body.clientData.email,
      });
      newCliente
        .save()
        .then(cliente => {
          // res.json(cliente)
          const newFactura = new Factura({
            owner_id: cliente._id,
          });
          newFactura.save()
          .then(factura => res.json(factura))
          .catch(err=>console.log(err));
        })
        .catch(err => console.log(err));
    }
  })
})

// const asignarClienteAFactura = (cliente) => {
//   const newFactura = new Factura({

//   })
// }

module.exports = router;