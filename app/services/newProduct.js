const Product = require('../models/product.model')

const créerProduit = async(Body) =>{

    const callProduct= new Product(Body)

callProduct.save()

}
module.exports = créerProduit;