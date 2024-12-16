const express = require('express');
const router = express.Router();
const { getPhraseOfTheDay, postPhraseOfTheDay, getRandomPhraseOfTheDay } = require('../controllers/phraseOfTheDay');
const authJwt = require('../middlewares/jwt');
const { isAdmin } = require('../middlewares/authorization');


// Rutas asociadas a cada controlador
router.get('/get-phraseOfTheDay', authJwt, getPhraseOfTheDay);
router.post('/post-phraseOfTheDay', authJwt, isAdmin, postPhraseOfTheDay);
router.get('/get-random-phraseOfTheDay', authJwt, getRandomPhraseOfTheDay);

module.exports = router;
