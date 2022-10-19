const créerProduit = require('../services/newProduct')



const Register = (req, res) => {

    console.log("sa passe Controller et route")
    console.log(req.body)

    const {name,price,description,image,quantity}= req

    créerProduit(name,price,description,image,quantity)
 
     res.json({message: "Produit créé !"})
     
 }

module.exports= Register