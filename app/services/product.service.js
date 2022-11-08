const products = require('../models/product.model')

const findAll = async ()  => {
 return await products.find()
}

const create = async (body) => {
     const callProduct= new products(body)
     await callProduct.save()
}
const findOneProduct = async(req)=>{
     const callOneProduct = await products.findById(req)
     return callOneProduct
}

const deleteProduct = async (obj) => {
     await products.findByIdAndDelete(obj.id);
}

module.exports = {findAll, create, findOneProduct, deleteProduct};
