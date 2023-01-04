const stripe = require('stripe')('sk_test_51MEBY7DW8mMJ2oLX1oLbA9joDMCNlIpff1ROUKIE6tUAVCxUhmxVBi6g9Si4aXzGfB6KMFDvX4qCO2Et2kYmcjEF00rkVgumuV');
const randomString = require('../services/utils.service')
const productLineService = require('../services/productline.service')
const orderService = require('../services/order.service')
const OrderModel = require('../models/order.model')


const paiementAuto = async(req, res) => {
    const random = randomString.genRandomString(20)
    console.log(req.params.id)
    const products = req.body
    console.log(products)
    const long = products.length
    // console.log(long)
    let totalPrice = 0
    // console.log(products.body)
    for(let i = 0; i < long; i++){
        totalPrice += products[i].quantity * products[i].price
    }
    console.log(totalPrice)
    totalPrice = totalPrice * 100
    let line_items = [

        {
            price_data: 
            {
                currency: 'eur',
                product_data:
                {
                    name: random,
                },
                unit_amount: totalPrice,
            },
            quantity: 1,
        }
    ]
        
    line_items = line_items.flat();
    console.log(line_items)

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url:'http://127.0.0.1:5173/paiment-sucess',
        cancel_url: 'http://localhost:5000/cancel' 
      });
    const order = await orderService.create({
        price_ht: totalPrice,
        order_state: '63b2b43b7f36155f8254afd4',
        addresse: null,
        user: req.params.id,
        // productLine: productLines,
        ref: random
      })
      console.log(order)
      const productLines = []
      products.forEach(async product => {
        const productLine = await productLineService.create({
            price_ht : product.price,
            quantity: product.quantity,
            product: product.id
        })
        let test = await OrderModel.findByIdAndUpdate(order._id, {
            $push: {
                productLine: productLine
            }
        })
        console.log("test", test)
      });
      
      res.send(session.url) 
}


module.exports = { paiementAuto};
