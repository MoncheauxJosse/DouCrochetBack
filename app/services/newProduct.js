const Product = require('../models/product.model')

const créerProduit = async(name,price,description,image,quantity) =>{

    console.log("sa passe service")

    const callProduct= new Product({
        name: name,
        price: price,
        description: description,
        image: image,
        quantity: quantity,
        tva: [],
        category: []
})

callProduct.save()

}
module.exports = créerProduit;