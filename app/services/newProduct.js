const Product = require('../models/product.model')

const créerProduit = async(Body) =>{

    console.log("sa passe service")

    const callProduct= new Product(Body)

callProduct.save()

}
module.exports = créerProduit;