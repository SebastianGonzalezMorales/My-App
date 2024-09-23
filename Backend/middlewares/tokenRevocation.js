const jwt = require('jsonwebtoken');

const revokedTokens = []; // Almacena los tokens revocados (puedes usar una base de datos en producción)

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const secret = process.env.secret;

    if (!token) {
        return res.status(401).send({ message: "No token provided" });
    }

    // Verificar si el token está en la lista de revocados
    if (revokedTokens.includes(token)) {
        return res.status(401).send({ message: "Token has been revoked" });
    }

    // Verificar el token JWT
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

// Función para agregar el token a la lista de revocados
const revokeToken = (token) => {
    revokedTokens.push(token);
};

module.exports = {
    verifyToken,
    revokeToken,
};
