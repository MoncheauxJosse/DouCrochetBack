const RoleModel = require('../models/role.model')

const findByRole = async function(role , res){
    return await RoleModel.find({role:role})
}

const findOneRole = async function(role, res){
    return await RoleModel.findOne({role:role})
}

const findbyObjectID = async function(req , res){
    return await RoleModel.findById(req)
}
const findAll = async ()  => {
    return await RoleModel.find()
   }

const insertrole = async function(role){
    const client = new RoleModel({ 
        role: role[0],
    });
    const moderateur = new RoleModel({ 
        role: role[1],
    });
    const admin = new RoleModel({ 
        role: role[2],
    });
    await client.save()
    await moderateur.save()
    await admin.save()

    return "ok"
}

module.exports = {findByRole ,findbyObjectID, findOneRole, insertrole, findAll}