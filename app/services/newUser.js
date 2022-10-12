const User = require('../models/user.model')

const callUser = new User({
    firstname: 'Elisaa',
    lastname: 'exemple',
    email: 'elisa@machin.fr',
    password: 'exemple',
    birthdate: '1987-05-05'
})

const callback = () =>{
    callUser.save()
}


module.exports = callUser;