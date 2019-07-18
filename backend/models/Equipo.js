const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipoSchema = new Schema({
  serial: String,
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  nombre: String,
  descripcion: String,
  entregado: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = Equipo = mongoose.model("equipos", EquipoSchema);