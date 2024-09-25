const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  selectedoption1: { type: Number, required: true },
  selectedoption2: { type: Number, required: true },
  selectedoption3: { type: Number, required: true },
  selectedoption4: { type: Number, required: true },
});

// Crear el modelo
exports.Question = mongoose.model('Question', questionSchema);

exports.questionSchema = questionSchema;

