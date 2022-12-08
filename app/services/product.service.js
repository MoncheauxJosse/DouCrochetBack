const products = require('../models/product.model')
const Category = require("../services/category.service");
const fs = require('fs')

const findAll = async ()  => {
     return await products.find()
    }
    

const page = async (searchName,page)  => {

     
     //name.startsWith ?
     let pageEnd = page * 10
     let pageStart = pageEnd -10
     let all

     if(searchName==='Totaux'){

          all = await products.find()

     }else{

          let AllProduct= await products.find()

          // ajouter un tolowercase !
         all = AllProduct.filter(productName=> productName.name.toLowerCase().includes(searchName.toLowerCase()))

          
     }


     let pageTotal = Math.floor(all.length /10)+1

     const ChoicePage = all.slice(pageStart, pageEnd)

     const infoPage={productsPage:ChoicePage,totalPages: pageTotal}

      return infoPage
     }

const create = async (body,image) => {
     const callProduct= new products({ 
          name: body.name,
          price: body.price,
          description: body.description,
          image: image,
          quantity: body.quantity,
          category:JSON.parse(body.categoryId)}
         )

         if( callProduct.category.length!==0){

          //fonctione avec 1ou plusieur category
          Category.updateRelation(callProduct.category,callProduct._id)
 
         }
     await callProduct.save()
}


const Product = async (id, productSelect, res) => {
     const product = await productService.findOneProduct(productSelect);
 
     Product.findOneProduct(id, { product: productSelect._id },
         function (err, product) {
             if (err) {
                 console.log(err)
                 return res.status(400).send(err)
             }
             else {
                 console.log("Updated Product : ", product);
                 return res.status(200).send(product)
             }
         })
 
 
     };
     
const editProduct = async (id, productSelect, res) => {
          const product = await productService.findOneProduct(productSelect);
          return await products.findOneProduct(obj.id);
}


const findOneProduct = async(req)=>{
     const callOneProduct = await products.findById(req)

     return callOneProduct
   
}

const UpdateProduct = async(filter,update)=>{

     await products.findOneAndUpdate(filter, update)


}

const deleteProduct = async (obj) => {
     products.findById(obj.id, (err, res) => {
          let imageResponse = res.image
          let split = imageResponse.split('http://localhost:5000')
          console.log(split[1])
          console.log(imageResponse)
            fs.unlink('./' + split[1], (err) => {
              if (err){
               console.log(err)
              };
              console.log('je passe dans unlink');
            });
     })
    return await products.findByIdAndDelete(obj.id);
}

const updateProduct =  (req, image)=>{
     
     return  products.findByIdAndUpdate(req.params.id,{
        name: req.body.produit,
        description: req.body.description,
        image: image,
        price: req.body.price,
        quantity: req.body.quantity,
        
     },{
        new: true
     })}
     
const findAllSearch = async (search)  => {
     const all = await products.find({ category: search });

     return all

    }

    


module.exports = {findAll,page, create, findOneProduct, deleteProduct, editProduct, updateProduct,findAllSearch,UpdateProduct};
