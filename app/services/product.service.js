const products = require('../models/product.model')

const findAll = async ()  => {
 return await products.find()
}

const create = async (body) => {
     const callProduct= new products(body)
     await callProduct.save()
}

module.exports = {findAll, create};
