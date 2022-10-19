const getproduct = require('../services/product.service');
const ProductModel = require('../models/product.model');


const findAll = async (req,res) => {
   getproduct().then(response => res.send(response)).catch(err => res.send(err));   
};

const insert = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    // Create a Role
    const product = new ProductModel({ ...req.body });
    // Save Role in the database
    ProductModel.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Role.',
            });
        else res.send(data);
    });
}

module.exports = {findAll, insert};

// const findOne = (req, res) => {
//     ProductModel.findById(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === 'not_found') {
//                 res.status(404).send({
//                     message: `Not found Role with id ${req.params.id}.`,
//                 });
//             } else {
//                 res.status(500).send({
//                     message: `Error retrieving Role with id ${req.params.id}`,
//                 });
//             }
//         } else res.send(data);
//     });
// }

