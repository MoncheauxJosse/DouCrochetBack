const Category = require('../models/category.model')

const createCategory = async (name) => {
    const category = new Category({
        name: name,
    })
    await category.save()
}
module.exports = {createCategory};
