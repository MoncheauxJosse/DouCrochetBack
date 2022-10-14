
const Role = require('../models/role.model')

const getRole = (res, req) =>{
    Role.find((error, data)=>{
        if(error)
        res.status(500).send({message : error.message})
        else
        res.send(data);
    })
}

// const login = async ()=> {
//     const roleverify = await getUser();
//     if(userexist){
//         //je verifie le mot de passe
//     }
//     else{
//         //envoyer erreur email incorrect
//     }
// }

module.exports = getRole