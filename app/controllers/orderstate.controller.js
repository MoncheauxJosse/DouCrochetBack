const OrderStateService = require('../services/order_state.service')

const editOrderState = (req, res) => {
    return OrderStateService.editOrder(req.params.id, req.body.stateSelect,res);
}

module.exports = {editOrderState}
