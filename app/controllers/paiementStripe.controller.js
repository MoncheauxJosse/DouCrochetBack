const stripe = require('stripe')('sk_test_51MEBY7DW8mMJ2oLX1oLbA9joDMCNlIpff1ROUKIE6tUAVCxUhmxVBi6g9Si4aXzGfB6KMFDvX4qCO2Et2kYmcjEF00rkVgumuV');


const paiement = async (req,res) => {
    let line_items = [];


line_items.push(
    [
        {
            price_data: 
            {
                currency: 'eur',
                product_data:
                {
                    name: 'Stripe',
                },
                unit_amount: 10,
            },
            quantity: 10,
        },
    ])

    line_items = line_items.flat();

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url:'http://127.0.0.1:5173/paiment-sucess',
        cancel_url: 'http://localhost:5000/cancel' 
      });
      res.send(session.url);
      
}

module.exports = {paiement};
