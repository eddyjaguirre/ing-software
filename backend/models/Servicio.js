const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicioSchema = new Schema({
  titulo: String,
  descripcion: String,
  serial_equipo: String,
  precio: Number,
  notas: {
    type:String,
    default: ''
  },
  completado: {
    type: Boolean,
    default: false,
  },
  entregado: {
    type: Boolean,
    default: false,
  },
  factura_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura'
  },
  tecnico_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = Servicio = mongoose.model("servicios", ServicioSchema);