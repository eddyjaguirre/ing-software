const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  juridico: Boolean,
  cedula: Number,
  nombre: String,
  direccion: String,
  telefono: String,
  email: String,
  facturas: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cliente = mongoose.model("clientes", ClienteSchema);