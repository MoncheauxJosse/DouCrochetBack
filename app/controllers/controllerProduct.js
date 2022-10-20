const créerProduit = require('../services/newProduct')



const Register = (req, res) => {

    créerProduit(req.body)
     
 }


 

module.exports= Register