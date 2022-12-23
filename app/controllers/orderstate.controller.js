const OrderStateService = require('../services/order_state.service')

const editOrderState = (req, res) => {
    console.log("je passe par la !", req.body.stateSelect);
    return OrderStateService.editOrder(req.params.id, req.body.stateSelect,res);
}

module.exports = {editOrderState}
