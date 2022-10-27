const jwt = require('jsonwebtoken');
const findRole = require('../controllers/role.controller')

const jwtSecurity = (email, role) =>{

    return jwt.sign({ email: email, role: role }, process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        });
}

module.exports = jwtSecurity;