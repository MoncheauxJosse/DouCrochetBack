const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');


const protect = asyncHandler(
    async(req, res, next) => {
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            try {
                /* Prendre le jeton de l'en-tête et le diviser en un tableau. Le deuxième élément du
                tableau est le jeton. */
                token = req.headers.authorization.split(" ")[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                /* Trouver l'utilisateur par l'identifiant dans le jeton, puis sélectionner toutes les
                informations de l'utilisateur à l'exception du mot de passe. */
                req.user = await User.findById(decoded.id).select("-password")
                next();
            }catch (error){
                console.error(error);
                res.status(401)
                throw new Error("Pas autorisé, token échoué")
            }
        }else if(!token){
            res.status(401)
            throw new Error("Pas autorisé, pas de token")
        }
    }
)

module.exports = protect;