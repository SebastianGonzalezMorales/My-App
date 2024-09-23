const express = require('express');
const router = express.Router();
const {
    loginUser,
    getUserData,
    registerUser,
    getRandomUser,
    getAllUsers,
    updateUser,
    deleteUser,
    logoutUser
} = require('../controllers/user');

// Rutas asociadas a cada controlador
router.post('/login', loginUser);
router.post('/userdata', getUserData);
router.post('/register', registerUser);
router.get('/get-random-user', getRandomUser);
router.get('/get-all-user', getAllUsers);
router.post('/update-user', updateUser);
router.post('/delete-user', deleteUser);
router.post('/logout-user', logoutUser);

module.exports = router;
