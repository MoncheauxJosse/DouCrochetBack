const RoleModel = require('../models/role.model')

const findByRole = async function(role , res){
    return await RoleModel.find({role:role})
}
 module.exports = {findByRole}