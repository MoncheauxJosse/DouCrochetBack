const OrderService = require('../services/order.service')
const token = require('../security/jwt.security')


const findAllFactureUser = async (req,res) => {
    // recuper le token , il faut le decoder
    let rep = token.decode(req.params.id)

   OrderService.findUser(rep._id).then(response=>{
    if(response.length ==0){
        response =[{order_bill:'Aucune facture'}]
        res.send(response)
       }else{
        res.send(response)
       }
   })
};

const findAllProductsFactureUser = async (req,res) => {

    OrderService.findAllFactureId(req.params.id).then(response=>{res.send(response)}).catch(err => res.send(err))
    
};


const findAll = async (req,res) => {
    OrderService.findOrders().then(response => res.send(response)).catch(err => res.send(err));
};


module.exports = {findAllFactureUser, findAll, findAllProductsFactureUser}
