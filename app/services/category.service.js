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
module.exports = {createCategory,findAll};
