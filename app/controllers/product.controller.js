const categoryService = require('../services/category.service')
const ProductService = require("../services/product.service");
const ProductLine = require("../services/productline.service")

const findAll = async (req,res) => {
    ProductService.findAll().then(response => res.send(response)).catch(err => res.send(err));
 };
 
const findAllPage = async (req,res) => {
   ProductService.page(req.params.id).then(response => res.send(response)).catch(err => res.send(err));
};

const findAllNouveau = async (req,res) => {
    // recupere tout les produit
    ProductService.findAll().then(response => { 
        // les compare entre eux, avec leur date ,pour les trier
        const result = response.sort(function(a,b){
            return new Date(b.creation_date)-new Date(a.creation_date)
        }) 
         //return les 7 dernier produit créer
            res.send(result.slice(0, 10))
        }).catch(err => res.send(err));
    };

const create = async (req, res) => {

    //créer tout d'abord l 'objet produit en ajoutant les id de categorie
    ProductService.create(req.body,
         req.protocol + '://' + req.get('host') + '/uploads/' + req.file.originalname).then((data) => {           
            res.status(201).send(data)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Product.',
            });
        })
         
         
}

const findAllTop = async (req,res) => {


    const existTopPRoduct =  await categoryService.findOneCategoryId('topProduit')

    ProductService.findAllSearch(existTopPRoduct[0]._id).then(response => res.send(response)).catch(err => res.send(err));
    

    };

    const deleteProduct = (req, res) => {
        ProductService.deleteProduct(req.params).then((data) => {
            res.status(201).send(data)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Product.',
            });
        })
    }
    const findOne = (req, res) => {
        ProductService.findOneProduct(req.params.id).then((data) => {
          res.send(data)
        }).catch((err)=>{
            res.status(500).send({
                message : "not found"
            })
        });
    }
    
    module.exports = {findAll,findAllPage, findOne, create, findAllNouveau, deleteProduct, findAllTop};
    

