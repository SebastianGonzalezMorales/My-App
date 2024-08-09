const { expressjwt: jwt } = require("express-jwt");

const secret =  process.env.SECRET
const api = process.env.API_URL
const authJwt = jwt({
                    secret: secret,
                    algorithms: ["HS256"],
                    isRevoked: isRevoked    
                }).unless({
                    path:[
                            //{url: /\/api\/v1\/moodState(.*)/ , methods: ['POST', 'OPTIONS'] },
                            //Con la línea de abajo "solo" permito que los usuarios puedan obtener los tips, 
                            //logiarse y registrarse
                            //Por ejemplo: para poder publicar tips tendrían que estar registrados como administrador.
                            //{url: /\/api\/v1\/tips(.*)/ , methods: ['GET', 'OPTIONS'] },
                          //  {url: /\/api\/v1\/users\/get-random-user(.*)/ , methods: ['GET', 'OPTIONS'] },
                            `${api}/tips`,
                            `${api}/users/login`,
                            `${api}/users/register`,    
                        
                    ]
                })

async function isRevoked(req, token) {
   if(!token.payload.isAdmin) {
        return true
    }
     return undefined;
}

module.exports = authJwt; 

/* import { expressjwt: jwt } from 'express-jwt'

function authJwt() {
    const secret = process.env.secret;
    return expressjwt({
        secret,
        algorithms: ['HS256'] 
    })
}

module.exports = authJwt;
 */