const roleService = require('../services/role.service')
const userService = require('../services/user.service')
const factureLineService= require('../services/productline.service')
const categoryService = require('../services/category.service')
const product = require('../services/product.service')
const Order = require('../services/order.service')

const insertRoleBDD = async ()=>{
    
    const exist = await roleService.findAll()
    const existCatégorie = await categoryService.findAll()
    
    if(exist.length < 3){
        const insert = await roleService.insertrole(["client","commercial","admin"])
        if(insert=="ok"){
            if(existCatégorie.length==0){                
                const categoryNounours = categoryService.createCategory({name:'nounours'})
                const categoryDoudou = categoryService.createCategory({name:'doudou'})
            }
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

    const productRec = await product.findAll()
    const User = await  userService.findAll()
    const findFacture = await  factureLineService.findAll()

    if(findFacture.length < 1){
        console.log("création d'une facture test et d'une commande test");
        const factureLine = await factureLineService.create({
            price_ht: 10,
            tva: 20 ,
            quantity: 2,
            product: productRec[0]._id
        })

        const findFacture = await  factureLineService.findAll()

        let rep = findFacture[0].id
        let adresseId =  User[0].addresse
        let userId =User[0].id

        dateCreer = new Date()

        const CreateFacture = await Order.create({
            order_state: 'En cours' ,
            order_bill:  dateCreer,
            addresse: adresseId,
            user: userId,
            productLine: [rep]
        })
    }
}

module.exports = {insertRoleBDD}

