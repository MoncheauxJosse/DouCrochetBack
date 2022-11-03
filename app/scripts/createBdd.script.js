const roleService = require('../services/role.service')
const userService = require('../services/user.service')
const factureLineService= require('../services/productline.service')
const categoryService = require('../services/category.service')

const insertRoleBDD = async ()=>{
    const exist = await roleService.findAll()
    const role = await roleService.findOneRole('admin');
    const facture = await factureLineService.findAll();
    const adminExist = await userService.findOneUser(role._id);
    const category = await categoryService.findAll();
    if(adminExist.length == 0){
        const createadmin = await userService.insertAdmin();
    }

    if(category.length == 0){
        const createCategory = await categoryService.createCategory("topProduct");
    }
    // creer la colone ProductLine en BD
    /*if(facture.length == 0){
        const createColomnFactureLine = await factureLineService.create( {price_ht: 12,
        tva: 5,
        quantity: 2,
        product: '635ba2e8e3753d15a760c24c'
        })
    }*/
    
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

