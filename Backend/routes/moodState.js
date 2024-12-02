const express = require('express');
const router = express.Router();
const { getMoodStates, postMoodState, getMoodStatesByUserId, getMoodStateById } = require('../controllers/moodState');

// Rutas asociadas a cada controlador
router.get('/get-moodState', getMoodStates);
router.post('/post-moodState', postMoodState); 
router.get('/get-MoodStatesByUserId', getMoodStatesByUserId);
router.get('/get-MoodStatesById/:id', getMoodStateById);

module.exports = router;