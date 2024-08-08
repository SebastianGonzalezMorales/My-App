const express = require('express');
const router = express.Router();
const { getMoodStates, postMoodState } = require('../controllers/moodState');

// Rutas asociadas a cada controlador
router.get('/get-moodState', getMoodStates);
router.post('/post-moodState', postMoodState);

module.exports = router;
