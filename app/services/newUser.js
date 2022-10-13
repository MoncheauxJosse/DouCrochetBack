const User = require('../models/user.model')

const callUser = new User({
    firstname: 'Elisaa',
    lastname: 'exemple',
    email: 'elisa@machin.fr',
    password: 'exemple',
    birthdate: '1987-05-05',
    telephone: ['0606060606'],
    role: '5f9f1b0b0b1b2c1c8c8c8c8c',
})

const callback = () => {
    callUser.save()
}


module.exports = {callUser, callback};