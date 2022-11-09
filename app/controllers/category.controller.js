const CategoryService = require("../services/category.service");

const findAll = async (req,res) => {
    CategoryService.findAll().then(response => res.send(response)).catch(err => res.send(err));
};



module.exports = {findAll};