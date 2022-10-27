const roleService = require('../services/role.service')

const insertRoleBDD = async ()=>{
    const exist = await roleService.findAll()
    if(exist.length < 3){
        const insert = await roleService.insertrole(["client","commercial","admin"])
        if(insert=="ok"){
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

