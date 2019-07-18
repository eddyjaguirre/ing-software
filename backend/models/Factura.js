const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacturaSchema = new Schema({
  pagado: {
    type: Boolean,
    default: false,
  },
  entregado: {
    type: Boolean,
    default: false,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  servicios: {
    type: Array,
    default: [],
    ref: 'Servicio'
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = Factura = mongoose.model("facturas", FacturaSchema);