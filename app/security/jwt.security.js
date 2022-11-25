const jwt = require('jsonwebtoken');
const findRole = require('../controllers/role.controller')

const jwtSecurity = (id, email, role, firstname, lastname, birthdate, adresse) =>{

    return jwt.sign({id:id , email: email, role: role, firstname:firstname,lastname : lastname, birthdate : birthdate, adresse : adresse }, process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        });
}

const decode=(token)=>{

return jwt.decode(token)


}

module.exports = {jwtSecurity,decode};