const { expressjwt: jwt } = require("express-jwt");

// Verifica que las variables se están cargando
console.log("JWT Secret:", process.env.SECRET); 
console.log("API URL:", process.env.API_URL);

const secret =  process.env.SECRET
const api = process.env.API_URL

if (!secret) {
    throw new Error("JWT secret is not defined in environment variables");
  }
  
const authJwt = jwt({
                    secret: secret,
                    algorithms: ["HS256"],
                    isRevoked: async (req, token) => undefined
                }).unless({
                    path:[
                            //{url: /\/api\/v1\/moodState(.*)/ , methods: ['POST', 'OPTIONS'] },
                            //Con la línea de abajo "solo" permito que los usuarios puedan obtener los phraseOfTheDay, 
                            //logiarse y registrarse, forgot-passowrd
                            //Por ejemplo: para poder publicar phraseOfTheDay tendrían que estar registrados como administrador.
                            //{url: /\/api\/v1\/phraseOfTheDay(.*)/ , methods: ['GET', 'OPTIONS'] },
                          //  {url: /\/api\/v1\/users\/get-random-user(.*)/ , methods: ['GET', 'OPTIONS'] },


                            `${api}/users/forgot-password`,  //Está línea la tengo que agregar por que el 
                                                             //usuario no esta autenticado en la aplicación
                                                             // y si no la agrego aquí me pide un token de authorización
                            `${api}/users/verify-reset-token`,          
                            `${api}/users/change-password`, 
                            `${api}/users/getReset-PasswordToken`, 
                            `${api}/users/verifytoken`, 
                            `/`,  
                            `${api}/users/decodetoken`,

                            `${api}/users/verificar`,
                            `${api}/phraseOfTheDay`,
                            `${api}/users/login`,
                            `${api}/users/register`,    
                            { url: new RegExp(`${api}/users/[^/]+/accept-policy`), methods: ['POST', 'OPTIONS'] },

                        
                    ]
                })

async function isRevoked(req, token) {
   if(!token.payload.isAdmin) {
        return true
    }
     return undefined;
}

module.exports = authJwt; 

