const roleService = require('../services/role.service')
const userService = require('../services/user.service')
const factureLineService= require('../services/productline.service')
const categoryService = require('../services/category.service')
const product = require('../services/product.service')
const Order = require('../services/order.service')
const orderStateService = require('../services/order_state.service')

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
        const findOrderState = await orderStateService.findOrderState()

        let rep = findFacture[0].id
        let adresseId =  User[0].addresse
        let userId =User[0].id
        let orderState = findOrderState[0].id

        dateCreer = new Date()

        const CreateFacture = await Order.create({
            order_state: [orderState] ,
            order_bill:  dateCreer,
            addresse: adresseId,
            user: userId,
            productLine: [rep]
        })
    }

}

const insertOrderState = async () => {
    const existOrders = await orderStateService.findOrderState()
    if(existOrders.length < 4){
        const insert = await orderStateService.insertState(["preparation","expedition","livraison", "recu"])
        if(insert=="ok"){
            console.log("Order State OK")
        }
        else{
            console.log("State error")
        }
    }
    else{
        console.log("Order State déjà ajouté")
    }
}
module.exports = {insertRoleBDD, insertOrderState}

