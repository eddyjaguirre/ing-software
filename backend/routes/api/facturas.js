const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Factura = require("../../models/Factura");
const Cliente = require("../../models/Cliente");
const Servicio = require("../../models/Servicio");
// const Equipo = require("../../models/Equipo");

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
      let newFactura = new Factura({
        _id: new mongoose.Types.ObjectId(),
        owner_id: cliente._id,
      });
      let servicios = req.body.clientData.servicios;
      for (let i=0; i < servicios.length; i++){
        let newServicio = new Servicio({
          titulo: servicios[i].titulo,
          descripcion: servicios[i].descripcion,
          serial_equipo: servicios[i].serial_equipo,
          precio: servicios[i].precio,
          notas: servicios[i].notas,
          tecnico_id: servicios[i].tecnico_id,
          factura_id: newFactura._id,
        });
        newFactura.servicios[i] = newServicio;
        newServicio.save();
      }
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
          let newFactura = new Factura({
            _id: new mongoose.Types.ObjectId(),
            owner_id: cliente._id,
          });
          let servicios = req.body.clientData.servicios;
          for (let i=0; i < servicios.length; i++){
            let newServicio = new Servicio({
              titulo: servicios[i].titulo,
              descripcion: servicios[i].descripcion,
              serial_equipo: servicios[i].serial_equipo,
              precio: servicios[i].precio,
              notas: servicios[i].notas,
              tecnico_id: servicios[i].tecnico_id,
              factura_id: newFactura._id,
            });
            newFactura.servicios[i] = newServicio;
            newServicio.save();
          }
          newFactura.save()
          .then(factura => res.json(factura))
          .catch(err=>console.log(err));
        })
        .catch(err => console.log(err));
    }
  })
})

// const asignarServicios = (req, res, next) => {
//   let servicios = req.body.clientData.servicios;
  
//   for (let i=0; i < servicios.length; i++){
//     let newServicio = new Servicio({
//       titulo: servicios[i].titulo,
//       descripcion: servicios[i].descripcion,
//       serial_equipo: servicios[i].serial_equipo,
//       precio: servicios[i].precio,
//       notas: servicios[i].notas,
//       tecnico_id: servicios[i].tecnico_id,
//       factura_id: newFactura._id,
//     });
//     newFactura.servicios[i] = newServicio;
//   }
// }

module.exports = router;