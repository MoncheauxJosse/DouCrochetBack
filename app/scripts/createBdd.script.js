const roleService = require('../services/role.service')
const userService = require('../services/user.service')
const factureLineService= require('../services/productline.service')
const categoryService = require('../services/category.service')

const insertRoleBDD = async ()=>{
    const exist = await roleService.findAll()
    if(exist.length < 3){
        const insert = await roleService.insertrole(["client","commercial","admin"])
        if(insert=="ok"){
            console.log("Role OK")
            const role = await roleService.findOneRole('admin');
            const adminExist = await userService.findOneUser(role._id);
            if(adminExist.length == 0){
                const createadmin = await userService.insertAdmin();
            }
            else{
                console.log("Admin error")
            }
        }
        else{
            console.log("Role error")

        }
    }
    else{
        console.log("BDD ok")
    }
}

module.exports = {insertRoleBDD}

