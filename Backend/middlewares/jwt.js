const { expressjwt: jwt } = require("express-jwt");

// Verifica que las variables se están cargando
console.log("JWT Secret:", process.env.SECRET); 
console.log("API URL:", process.env.API_URL);

const secret = process.env.SECRET;
const api = process.env.API_URL;

if (!secret) {
    throw new Error("JWT secret is not defined in environment variables");
}

const authJwt = jwt({
    secret: secret,
    algorithms: ["HS256"],
    isRevoked: async (req, token) => undefined
}).unless({
    path: [
        // **Rutas de Autenticación (`/auth`)**
        `${api}/auth/login`,        // Login de usuarios
        `${api}/auth/register`,     // Registro de nuevos usuarios
        `${api}/auth/logout`,       // Cierre de sesión

        // **Rutas de Recuperación y Restablecimiento de Contraseñas (`/password`)**
        `${api}/password/forgot-password`,        // Solicitud de recuperación de contraseña
        `${api}/password/verify-reset-token`,     // Verificación del token de restablecimiento
        `${api}/password/change-password`,        // Cambio de contraseña
        `${api}/password/get-reset-password-token`, // Obtener token de restablecimiento
        `${api}/password/verifytoken`,            // Verificación general de token

        // **Rutas de Verificación y Decodificación de Tokens (`/tokens`)**
        `${api}/tokens/decodetoken`, // Decodificación de tokens

        // **Rutas de Gestión de Usuarios (`/user-management`)**
        `${api}/user-management/verificar`, // Verificación de usuario
        { 
            url: new RegExp(`${api}/user-management/[^/]+/accept-policy`), 
            methods: ['POST', 'OPTIONS'] 
        }, // Aceptación de políticas por usuario

        // **Otras Rutas Públicas**
        `/`,                         // Ruta raíz
        `${api}/phraseOfTheDay`,     // Obtener la frase del día

        // **Rutas Adicionales (si las hay)**
        // Puedes agregar más rutas públicas aquí si es necesario
    ]
});

async function isRevoked(req, token) {
  if(!token.payload.isAdmin) {
       return true
   }
    return undefined;
}

module.exports = authJwt;
