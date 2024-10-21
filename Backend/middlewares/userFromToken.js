const jwt = require('jsonwebtoken');
const User = require('../models/user'); 


const userFromToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Decodificar el token
    const decoded = jwt.verify(token, process.env.secret);

    // Buscar al usuario en la base de datos
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Asignar el usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado', error: error.message });
  }
};

module.exports = userFromToken;
