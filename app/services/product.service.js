const products = require('../models/product.model')

const findAll = async ()  => {
 return await products.find()
}

const create = async (body) => {
     const callProduct= new products(body)
     await callProduct.save()
}
const findOneProduct = async(req)=>{
     const callOneProduct = await findOne(req.params.id)
     return callOneProduct

}
module.exports = {findAll, findOneProduct, create};
