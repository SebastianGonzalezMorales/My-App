const express = require('express');
const router = express.Router();
const { getMoodStates, postMoodState } = require('../controllers/moodState');
const authJwt = require('../middlewares/jwt');
const isAuthenticated = require('../middlewares/authorization');

// Rutas asociadas a cada controlador
router.post('/post-moodState', authJwt, isAuthenticated, postMoodState);
router.get('/get-moodState', isAuthenticated, getMoodStates);
//router.post('/post-moodState', postMoodState);

module.exports = router;
