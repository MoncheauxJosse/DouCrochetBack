
const RoleModel = require('../models/role.model');

const findAll = (req, res) => {
    RoleModel.find()
        .then((roles) => {
            res.status(200).send(roles);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving roles.',
            });
        });
}


const insert = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }
    // Create a Role
    // const role = new RoleModel({ ...req.body });
    const role = new RoleModel({
        role : "admin"
    })
    RoleModel.save();
    // Save Role in the database
    RoleModel.create(role, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Role.',
            });
        else res.send(data);
    });
}

const findOne = (req, res) => {
    RoleModel.findOne(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Role with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Role with id ${req.params.id}`,
                });
            }
        } else res.send(data);
    }).then((data)=>{
        res.status(200).send(data)
    });
}

const findByRole = async function(role){
   return await roleService.findByRole(role)
}

const findbyObjectID = async function(req){
    return await roleService.findbyObjectID(req)
}

module.exports = {findAll, insert, findOne, findByRole, findbyObjectID}