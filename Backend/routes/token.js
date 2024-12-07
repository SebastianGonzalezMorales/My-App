const express = require('express');
const { verifyTokenController, decodeToken, getUserId } = require('../controllers/users/token');
const verifyToken  = require('../middlewares/verifyToken')

const router = express.Router();

router.get('/verifyToken', verifyTokenController, verifyToken);
router.get('/decodeToken', decodeToken);
router.post('/userid', getUserId);


module.exports = router;
