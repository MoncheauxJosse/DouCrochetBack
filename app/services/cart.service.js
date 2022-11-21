const Cart = require("../models/productline.model");
const productService =  require("../services/product.service")

const cart = async () => {
    const carts = await Cart.find().populate('Product');
    console.log(carts)
    return carts[0];
};

const addItem = async payload => {
    console.log(payload)
    const newItem = await Cart.create(payload);
    return newItem
}

const addItemToCart = async (req, res) => {
    const {product} = req.body;
    const quantity = Number.parseInt(req.body.quantity);
    try {
        let cart = await Cart.find().populate('product');
        let productDetails = await productService.findOneProduct(product);
             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--Si le panier existe ----
        if (cart) {
            console.log(cart)
            //---- Vérifie si l'index existe ----
            const indexFound = cart.findIndex(item => item._id == product);
            console.log(indexFound)
            //------Pour supprimer un produit du panier  -------
            // if (indexFound !== -1 && quantity <= 0) {
            //     cart.items.splice(indexFound, 1);
            //     if (cart.items.length == 0) {
            //         cart.subTotal = 0;
            //     } else {
            //         cart.subTotal = cart.product.map(item => item.total).reduce((acc, next) => acc + next);
            //     }
            // }
            //----------Vérifie si le produit existe , ajoute l'ancienne quantité avec la nouvelle et update le prix total-------
            // if (indexFound !== -1) {
            //     cart.product[indexFound].quantity = cart.product[indexFound].quantity + quantity;
            //     cart.product[indexFound].total = cart.product[indexFound].quantity * productDetails.price;
            //     cart.product[indexFound].price = productDetails.price
            // }
            //----Vérifie si la quantité est supérieure à 0 et ajoute le produit au tableau ----
            if (quantity > 0) {
                cart.push({
                    _id: product,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                })
                console.log(cart)
                cart.price_ht = cart.map(item => item.total).reduce((acc, next) => acc + next);
                console.log(cart.price_ht)
            }
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            console.log(data)
            res.status(200).json({
                type: "success",
                mgs: "Process Successful",
                data: data
            })
        }
        //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
        else {
            const cartData = {
                items: [{
                    productId: product,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                price_ht: parseInt(productDetails.price * quantity)
            }
            cart = await addItem(cartData)
            let data = await cart.save();
            res.json(cart);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Une erreur est survenue (catch)",
            err: err
        })
    }
}

module.exports = {cart, addItem, addItemToCart}