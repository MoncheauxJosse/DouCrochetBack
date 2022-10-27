const roleService = require('../services/role.service')
const userService = require('../services/user.service')

const insertRoleBDD = async ()=>{
    const exist = await roleService.findAll()
    const role = await roleService.findOneRole('admin');
    const adminExist = await userService.findOneUser(role._id);
    if(adminExist.length == 0){
        const createadmin = await userService.insertAdmin();
    }
    if(exist.length < 3){
        const insert = await roleService.insertrole(["client","commercial","admin"])
        if(insert=="ok" && createadmin=="ok"){
            console.log("insertOk")
        }
        else{
            console.log("erreur")

        }
    }
    else{
        console.log("BDD ok")
    }
}

module.exports = {insertRoleBDD}

