const ReturnProductService = require('../services/returnProduct.service');

const create = async (req, res) => {

    //créer tout d'abord l 'objet produit en ajoutant les id de categorie
    ReturnProductService.create(req.body,
         req.protocol + '://' + req.get('host') + '/uploadsReturn/' + req.file.originalname).then((data) => {           
            res.status(201).send(data)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Product.',
            });
        })                
}

module.exports = {create}