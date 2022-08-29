const { expressjwt: jwt } = require("express-jwt");

const secret =  process.env.SECRET
const api = process.env.API_URL
const authJwt = jwt({
                    secret: secret,
                    algorithms: ["HS256"],
                }).unless({
                    path:[
                        {url:`${api}/products` , methods: ['GET', 'OPTIONS']},
                            `${api}/users/login`,
                            `${api}/users/register`,    
                        
                    ]
                })

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