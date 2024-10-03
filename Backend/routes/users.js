const express = require('express');
const router = express.Router();
const {
    loginUser,
    getUserData,
    getUserId,
    registerUser,
    getRandomUser,
    getAllUsers,
    updateUser,
    deleteUser,
    logoutUser,
    verifyEmail,
    forgotPassword,
    changePassword,
    verifyResetToken,
    getResetPasswordToken
} = require('../controllers/user');

// Rutas asociadas a cada controlador
router.post('/login', loginUser);
router.post('/userdata', getUserData);
router.post('/userid', getUserId);
router.post('/register', registerUser);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);
router.get('/verify-reset-token', verifyResetToken);
router.post('/getReset-PasswordToken', getResetPasswordToken);
router.get('/get-random-user', getRandomUser);
router.get('/get-all-user', getAllUsers);
router.post('/update-user', updateUser);
router.post('/delete-user', deleteUser);
router.post('/logout-user', logoutUser);
router.get('/verificar', verifyEmail);

module.exports = router;
