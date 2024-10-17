const express = require('express');
const router = express.Router();
const { getMoodStates, postMoodState, getMoodStatesByUserId } = require('../controllers/moodState');

// Rutas asociadas a cada controlador
router.get('/get-moodState', getMoodStates);
router.post('/post-moodState', postMoodState); 
router.get('/get-MoodStatesByUserId', getMoodStatesByUserId)

module.exports = router;
