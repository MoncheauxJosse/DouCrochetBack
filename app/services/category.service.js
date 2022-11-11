const category = require('../models/category.model')


const findAll = async ()  => {
    return await category.find()
   }

const createCategory = async (name) => {
    const callCategory = new category({
        name: name,
    })
    await callCategory.save()
}

const updateRelation =async (idCategory,idProduct) =>{

    await category.updateMany({ '_id': idCategory }, { $push: { product:  idProduct } })
}
module.exports = {createCategory,findAll, updateRelation};
