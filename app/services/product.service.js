const products = require('../models/product.model')
const Category = require("../services/category.service");

const findAll = async ()  => {
     return await products.find()
    }
    

const page = async (page)  => {

     let pageEnd = page * 10
     let pageStart = pageEnd -10

     const all = await products.find()


     let pageTotal = Math.floor(all.length /10)+1

     const ChoicePage = all.slice(pageStart, pageEnd)

     const infoPage={productsPage:ChoicePage,totalPages: pageTotal}

      return infoPage
     }

const create = async (body,image) => {
     console.log(image);
     const callProduct= new products({ 
          name: body.name,
          price: body.price,
          description: body.description,
          image:image,
          quantity: body.quantity,
          category:JSON.parse(body.categoryId)}
         )

         if( callProduct.category.length!==0){

          //fonctione avec 1ou plusieur category
          Category.updateRelation(callProduct.category,callProduct._id)
 
         }
     await callProduct.save()
}
const findOneProduct = async(req)=>{
     const callOneProduct = await products.findById(req)

     return callOneProduct
   
}

const deleteProduct = async (obj) => {
    return await products.findByIdAndDelete(obj.id);
}

module.exports = {findAll,page, create, findOneProduct, deleteProduct};
