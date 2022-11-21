const cartService = require('../services/cart.service')

const addToCart = async (req, res) => {
    try {
        const cart = await cartService.addItemToCart(req, res);
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Une erreur est survenue dans l\'envoi du produit',
        });
    }
}

const getCart = async (req, res) => {
    try {
        let cart = await cartService.cart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Panier non trouvé",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Une erreur est survenue",
            err: err
        })
    }
}

module.exports = {addToCart, getCart}