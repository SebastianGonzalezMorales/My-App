const express = require('express');
const { loginUser, registerUser, verifyEmail, logoutUser } = require('../controllers/users/auth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/verificar', verifyEmail);
router.post('/logout-user', logoutUser);

module.exports = router;
