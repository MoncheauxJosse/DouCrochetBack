const category = require('../models/category.model')

const créerCatégory = async(name) =>{

    console.log("sa passe service")

    const callCatégory= new Product({
        name: name,
        
})

callCatégory.save()

}
module.exports = créerCatégory;