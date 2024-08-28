// authorizationMiddlewares.js

// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
    if (req.auth && req.auth.isAdmin) {
        next();  // Si es administrador, continuar
    } else {
        res.status(403).json({ message: 'Acceso denegado: Se requieren permisos de administrador.' });
    }
}

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.auth) {
        next();  // Si el usuario está autenticado, continuar
    } else {
        res.status(401).json({ message: 'Acceso denegado: Usuario no autenticado.' });
    }
}

module.exports = { isAdmin, isAuthenticated };
