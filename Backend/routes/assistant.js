const express = require('express');
const router = express.Router();
const { getAssistantByCarrera, addAsistente } = require('../controllers/assistantController');

// Rutas asociadas a cada controlador
router.get('/:carrera', getAssistantByCarrera);
router.post('/add-asistente', addAsistente);

module.exports = router;
