const créerProduit = require('../services/newProduct')



const Register = (req, res) => {

    console.log("sa passe Controller et route")
    console.log(req.body)

    

    créerProduit(req.body)
 
     res.json({message: "Produit créé !"})
     
 }


 

module.exports= Register