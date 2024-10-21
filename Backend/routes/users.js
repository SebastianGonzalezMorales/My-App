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
    getResetPasswordToken,
    verifyTokenController,
    acceptPrivacyPolicy,
    decodeToken
} = require('../controllers/user');

const verifyToken  = require('../middlewares/verifyToken')
const userFromToken  = require('../middlewares/userFromToken')

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
router.get('/verifyToken', verifyTokenController, verifyToken);
router.get('/decodeToken', decodeToken);


//Controlador de prueba para middleware
router.get('/test-user', userFromToken, (req, res) => {
    // Aquí simplemente devolvemos el usuario autenticado
    if (req.user) {
      res.status(200).json({ message: 'Usuario autenticado', user: req.user });
    } else {
      res.status(401).json({ message: 'No se encontró el usuario' });
    }
  });

module.exports = router;
