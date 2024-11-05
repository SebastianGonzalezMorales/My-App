const express = require('express');
const router = express.Router();
const { getTips, postTips, getAllTips } = require('../controllers/tips');

// Ruta para obtener un consejo basado en el estado de ánimo del usuario
router.get('/get-tips', getTips);
router.post('/post-tips', postTips);
router.get('/get-all-tips', getAllTips);

module.exports = router;
