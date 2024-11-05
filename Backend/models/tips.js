const mongoose = require('mongoose');

// Definir el esquema para los consejos
const tipsSchema = new mongoose.Schema({
  estado: {
    type: String,
    enum: ['Mal', 'Regular', 'Bien', 'Excelente'],
    required: true,
  },
  consejosActividades: [
    {
      consejo: {
        type: String,
        required: true,
      },
      actividades: {
        type: [String],
        required: true,
      },
    },
  ],
  consejosGenerales: {
    type: [String], // Consejos generales para el estado, no asociados a actividades específicas
    default: [],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Crear el modelo a partir del esquema
const Tips = mongoose.model('Tips', tipsSchema);

module.exports = Tips;
