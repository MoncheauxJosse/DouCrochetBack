const User = require('../models/user.model')

const findAll = async ()  => {
 return await User.find().populate("role");
}
module.exports = {findAll};
