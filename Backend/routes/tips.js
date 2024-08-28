const express = require('express');
const router = express.Router();
const { getTips, postTips, getRandomTips } = require('../controllers/tips');
const authJwt = require('../middlewares/jwt');
const { isAdmin } = require('../middlewares/authorization');


// Rutas asociadas a cada controlador
router.get('/get-tips', authJwt, getTips);
router.post('/post-tips', authJwt, isAdmin, postTips);
router.get('/get-random-tips', getRandomTips);

module.exports = router;
