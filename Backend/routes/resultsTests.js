const express = require('express');
const router = express.Router();
const { createResultTest, getResultsTestsByUserId, getAllResultsTests, getResultTestById } = require('../controllers/resultsTests');

// Rutas para las preguntas
router.post('/post-resultsTest', createResultTest); // Crear pregunta
router.post('/get-resultsTestUser/:userId', getResultsTestsByUserId)
router.get('/get-resultsTest', getAllResultsTests); // Obtener todas las preguntas
router.get('/get-resultsTest/:id', getResultTestById); // Obtener pregunta por ID

module.exports = router;