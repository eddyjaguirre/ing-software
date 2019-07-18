const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicioSchema = new Schema({
  titulo: String,
  descripcion: String,
  notas: String,
    completado: {
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
  equipo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo'
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = Servicio = mongoose.model("servicios", ServicioSchema);