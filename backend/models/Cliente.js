const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  juridico: Boolean,
  cedula: String,
  nombre: String,
  direccion: String,
  telefono: String,
  email: String,
  facturas: {
    type: Array,
    default: [],
  }, 
});

module.exports = Cliente = mongoose.model("clientes", ClienteSchema);