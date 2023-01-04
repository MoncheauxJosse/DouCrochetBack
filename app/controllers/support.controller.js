const ReturnProductService = require('../services/returnProduct.service');
const ComplaintService = require('../services/complaint.service');

const create = async (req, res, err) => {

    if (!req.file) {
        console.log("pas d'image recu");
        res.status(500).send({
            message: err.message || 'Image Obligatoire !',
        });
        }else{
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

                   
}

const createComplainte = async (req, res) => {

    ComplaintService.create(req.body).then((data) => {           
            res.status(201).send(data)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Product.',
            });
        })             
}

const getReturns = async (req, res)=>{
    ReturnProductService.getAllReturn().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({
            message : "une erreur lors de la récupéartion des retours de produit à eu lieu"
        })
    })

}
const modifyState = async (req,res)=>{
    ReturnProductService.modifyState(req).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({
            message : "une erreur lors de la modification du status de retour à eu lieu"
        })
    })
}

module.exports = {create, createComplainte, getReturns, modifyState}