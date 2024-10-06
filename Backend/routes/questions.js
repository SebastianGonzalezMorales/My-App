const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion } = require('../controllers/questions');

// Rutas para las preguntas
router.post('/post-questions', createQuestion); // Crear pregunta
router.get('/get-questions', getAllQuestions); // Obtener todas las preguntas
router.get('/get-questions/:id', getQuestionById); // Obtener pregunta por ID
router.put('/update-questions/:id', updateQuestion); // Actualizar pregunta
router.delete('/delete-questions/:id', deleteQuestion); // Eliminar pregunta

module.exports = router;