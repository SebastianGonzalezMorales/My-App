const express = require('express');
const router = express.Router();
const { getTips, postTips, getRandomTips } = require('../controllers/tips');

// Rutas asociadas a cada controlador
router.get('/get-tips', getTips);
router.post('/post-tips', postTips);
router.get('/get-random-tips', getRandomTips);

module.exports = router;
