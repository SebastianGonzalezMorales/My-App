const { ResultsTests } = require('../models/resultsTests'); // Asegúrate de ajustar la ruta según tu estructura de carpetas

// Crear un nuevo resultado de test
const createResultTest = async (req, res) => {
  try {
    const { total, severity, date } = req.body; // Asegúrate de que el cuerpo de la solicitud tenga estos campos

    const newResult = new ResultsTests({
      total,
      severity,
      date,
      created: new Date(), 
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
