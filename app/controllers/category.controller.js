const CategoryService = require("../services/category.service");

const findAll = async (req,res) => {
    CategoryService.findAll().then(response => res.send(response)).catch(err => res.send(err));
};


const create = async (req,res)=>{
    CategoryService.createCategory(req.body).then((data) => {           
           res.status(201).send(data)
       }).catch((err) => {
           res.status(500).send({
               message: err.message || 'Some error occurred while creating the Product.',
           });
       })
}
module.exports = {findAll,create};