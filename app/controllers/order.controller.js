const OrderService = require('../services/order.service')
const User = require('../services/user.service')
const token = require('../security/jwt.security')


const findAllFactureUser = async (req,res) => {

    // recuper le token , il faut le decoder
    let rep = token.decode(req.params.id)

    console.log(rep)
   let OrderUser = await OrderService.findUser(rep._id)

   console.log("voici la factur "+OrderUser)
   console.log("longeur "+OrderUser.length)

   if(OrderUser.length ==0){

    OrderUser =[{order_bill:'Aucune facture'}]
    res.send(OrderUser)

   }else{

    res.send(OrderUser)
   }

  


};

module.exports = {findAllFactureUser}