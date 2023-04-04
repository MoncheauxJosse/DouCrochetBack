const category = require('../models/category.model')


const findAll = async ()  => {
    return await category.find()
   }

   const findAllTopProduct = async ()  => {
    return await category.name.find("topProduit")
   }
const createCategory = async (name) => {
    const callCategory = new category({
        name: name.name,
    })
    await callCategory.save()
}

const findOneCategoryId = async (name) => {
     const categoryRecup = await category.find({ name: name })
        
     return categoryRecup
}

const refreshRelation =async (idCategory) =>{

    await category.updateMany({ '_id': idCategory }, { product: [] } )
}

const updateRelation =async (idCategory,idProduct) =>{

    await category.updateMany({ '_id': idCategory }, { $push: { product:  idProduct } })
}
module.exports = {createCategory,findAll, updateRelation, findAllTopProduct,findOneCategoryId,refreshRelation};
