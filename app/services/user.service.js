const User = require('../models/user.model')

const getuser = async ()  => {
 return await User.find()
}



module.exports = getuser;