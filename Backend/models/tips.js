const mongoose = require('mongoose');

// Definir el esquema para los consejos
const tipsSchema = new mongoose.Schema({
  estado: {
    type: String,
    enum: ['Mal', 'Regular', 'Bien', 'Excelente'],
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now, // Este campo puede ser opcional en el uso actual
  },
});

// Crear el modelo a partir del esquema
const Tips = mongoose.model('Tips', tipsSchema);

module.exports = Tips;
