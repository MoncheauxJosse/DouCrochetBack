const jwt = require('jsonwebtoken');

const jwtSecurity = (id, email, role) =>{
    return jwt.sign({id : id, email : email, role: role}, process.env.JWT_SECRET, 
    {
        expiresIn: "30d",
    });
}

module.exports = jwtSecurity;