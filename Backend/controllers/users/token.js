const jwt = require('jsonwebtoken');

// Asignar la clave secreta desde las variables de entorno
const secret = process.env.SECRET;

if (!secret) {
  throw new Error('La clave secreta (SECRET) no está definida en las variables de entorno.');
}

const decodeToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
    }

    let decoded;

    // Intentar verificar el token para ver si ha expirado
    try {
        jwt.verify(token, secret);
        // Si la verificación es exitosa, decodificar el token normalmente
        decoded = jwt.decode(token);
        return res.status(200).json({ message: 'Token válido', decoded });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Decodificar el token sin verificarlo si ha expirado
            decoded = jwt.decode(token);
            return res.status(400).json({
                message: 'Token expirado',
                decoded
            });
        } else {
            // Cualquier otro error
            return res.status(400).json({ message: 'Token inválido', error: error.message });
        }
    }
};

const getUserId = async (req, res) => {
    const { token } = req.body; // Se extrae el token del cuerpo de la solicitud
    try {
        const user = jwt.verify(token, secret); // Se verifica y decodifica el token usando la clave secreta
        const userId = user.userId; // Asumiendo que el userId está guardado como 'id' en el payload del token
        // console.log(user);
        // Devuelve el userId en la respuesta
        return res.send({ status: "Ok", userId: userId });
    } catch (error) {
        return res.status(400).send({ error: error.message }); // Manejo de errores
    }
};

const verifyTokenController = (req, res) => {
    res.status(200).json({ message: 'Token válido' });
};

module.exports = { verifyTokenController, decodeToken, getUserId };