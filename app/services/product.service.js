const products = require('../models/product.model')

const getproduct = async ()  => {
 return await products.find()
}



module.exports = getproduct;
