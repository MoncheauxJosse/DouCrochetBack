const OrderStateModel = require("../models/orderState.model")
const OrderModel = require('../models/order.model')

const insertState = async function(state){
    const preparation = new OrderStateModel({ 
        state: state[0],
    });
    const expedition = new OrderStateModel({ 
        state: state[1],
    });
    const livraison = new OrderStateModel({ 
        state: state[2],
    });
    const recu = new OrderStateModel({ 
        state: state[3],
    });
    await preparation.save()
    await expedition.save()
    await livraison.save()
    await recu.save()

    return "ok"
}

const findOrderState = async ()  => {
    return await OrderStateModel.find()
   }


const findOneState = async function(state, res){
    return await OrderStateModel.findOne({state:state})
}

const editOrder = async (id, stateSelect, res) => {
    const state = await findOneState(stateSelect);
    OrderModel.findByIdAndUpdate(id, { order_state: state._id },
     function (err, order) {
         if (err) {
             console.log(err)
             return res.status(400).send(err)
         }
         else {
             console.log("Updated State : ", order);
             return res.status(200).send(order)
         }
     })
    };

module.exports = {insertState, findOrderState, findOneState, editOrder};