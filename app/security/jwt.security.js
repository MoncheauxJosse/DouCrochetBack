const jwt = require('jsonwebtoken');
const findRole = require('../controllers/role.controller')

const jwtSecurity = (id, email,telephone, role, firstname, lastname, birthdate, adresse) =>{

    return jwt.sign({_id: id, email: email,telephone : telephone, role: role, firstname:firstname,lastname : lastname, birthdate : birthdate, adresse : adresse }, process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        });
}

module.exports = jwtSecurity;