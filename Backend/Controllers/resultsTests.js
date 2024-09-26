const { ResultsTests } = require('../models/resultsTests'); // Asegúrate de ajustar la ruta según tu estructura de carpetas
const mongoose = require('mongoose');
const { User } = require('../models/user');

// Crear un nuevo resultado de test
const createResultTest = async (req, res) => {
  try {
    const { total, severity, date, userId } = req.body;

    // Validación del userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'El userId es requerido y debe ser un ID válido.' });
    }

    // Verificar si el usuario existe en la base de datos
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'El usuario no existe.' });
    }

    const newResult = new ResultsTests({
      total,
      severity,
      date,
      created: new Date(),
      userId: userExists._id, // Usa el _id del usuario existente
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el resultado del test', error: error.message });
  }
};

// Obtener todos los resultados de tests
const getAllResultsTests = async (req, res) => {
  try {
    const results = await ResultsTests.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los resultados de los tests', error: error.message });
  }
};

// Obtener un resultado de test por ID
const getResultTestById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ResultsTests.findById(id);

    if (!result) {
      return res.status(404).json({ message: 'Resultado de test no encontrado' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el resultado del test', error: error.message });
  }
};

// Exportar los controladores
module.exports = {
  createResultTest,
  getAllResultsTests,
  getResultTestById,
};
