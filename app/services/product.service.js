const products = require('../models/product.model')
const Category = require("../services/category.service");
const fs = require('fs')

const findAll = async ()  => {
     return await products.find()
    }
    

const page = async (searchName,page)  => {

     console.log("sa passe dans le service",searchName)

     
     //name.startsWith ?
     let pageEnd = page * 10
     let pageStart = pageEnd -10
     let all

     if(searchName==='Totaux'){

          all = await products.find()

     }else{

          let AllProduct= await products.find()

          // ajouter un tolowercase !
         all = AllProduct.filter(productName=> productName.name.toLowerCase().startsWith(searchName.toLowerCase()))

          
     }

     console.log(all)


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
     console.log(id, product._id, "edit product");
 
     console.log(id, product._id, "produit modifier");
 
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
          console.log(id, product._id, "produit modifier");
}


const findOneProduct = async(req)=>{
     const callOneProduct = await products.findById(req)

     return callOneProduct
   
}

const UpdateProduct = async(filter,update)=>{

     await products.findOneAndUpdate(filter, update)


}

const deleteProduct = async (obj) => {
     // products.findById(obj.id, (err, res) => {
     //      var imageResponse = res.image; 
     //        console.log(imageResponse);
     //        fs.unlink(__dirname + '/uploads' + imageResponse + ".png", (err) => {
     //          if (err) throw err;
     //          console.log('successfully deleted file');
     //        });
     // })
    return await products.findByIdAndDelete(obj.id);
}

const updateProduct =  (req, image)=>{
     console.log(req.body + " body");
     return  products.findByIdAndUpdate(req.params.id,{
        name: req.body.produit,
        description: req.body.description,
        image: image,
        price: req.body.price,
        quantity: req.body.quantity,
        
    }.save),UpdateProduct,findAllSearch}
     
const findAllSearch = async (search)  => {
     const all = await products.find({ category: search });

     return all

    }

    


module.exports = {findAll,page, create, findOneProduct, deleteProduct, editProduct, updateProduct,findAllSearch,UpdateProduct};
