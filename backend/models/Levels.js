const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  nombre: {
    type: 'String',
    required: true,
  },
  nivel: {
    type: 'Number',
    required: true,
  }
});

module.exports = Level = mongoose.model("nivelesUsuario", LevelSchema, "nivelesUsuario");