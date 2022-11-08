const products = require('../models/product.model')

const findAll = async ()  => {
 return await products.find()
}

const create = async (body,image) => {
     console.log(image);
     const callProduct= new products({ 
          name: body.name,
          price: body.price,
          description: body.description,
          image:image,
          quantity: body.quantity}
         )
     await callProduct.save()
}

module.exports = {findAll, create};
