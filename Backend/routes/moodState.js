const express = require('express');
const router = express.Router();
const { getMoodStates, postMoodState } = require('../controllers/moodState');
const authJwt = require('../middlewares/jwt');

// Rutas asociadas a cada controlador
router.post('/post-moodState', authJwt, postMoodState);
router.get('/get-moodState', getMoodStates);
//router.post('/post-moodState', postMoodState);

module.exports = router;
