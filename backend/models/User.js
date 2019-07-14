const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  }, 
  password: {
    type: String,
    required: true,
  }, 
  date: {
    type: Date,
    default: Date.now,
  },
  nivelUsuario: {
    type: Number,
    required: true,
    default: 0,
  },
  datosPersonales: {
    nombre: {
      type: String,
      required: true,
      default: 'Admin'
    },
    cedula: Number,
    rif: String,
    especialidad: String,
    direccion: String,
    telefono: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);