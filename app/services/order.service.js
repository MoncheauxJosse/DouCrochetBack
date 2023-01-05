const Order = require("../models/order.model");
const ProductsLine = require("../models/productline.model")
const returnProductModel = require("../models/returnProduct.model");


const findUser = async (reqBody)  => {
    console.log("id",reqBody)
    return await Order.find({user: reqBody})
   }

   const create = async (Body)  => {

    const newOrder = new Order(Body)
    await newOrder.save()
   
   }

   const findAll = async ()  => {

    const user = Order.find().populate('user')
    console.log("service id user",user)
    return user
   }

   const findAllFactureId = async (factureId)  => {

    // recupere le tableaux d'id des Ligne de produit lié a la facture
    const returnLineProducts = await Order.find({_id: factureId}).populate({
        path: 'productLine',
        model: 'ProductLine',
        populate: {
            path: 'product',
            model: 'Product'
        }
   })
    console.log("service", returnLineProducts)

    /*//recupere la longueur Max du tableaux 
    const long = returnLineProducts[0].productLine.length
    //recupere le tableaux
    const TableProduct = returnLineProducts[0].productLine
    console.log("longueur tab Produit",long)
    console.log("table ProduitId", TableProduct)

    //créé un tableaux vide
    let returnEnd = new Array;

    //recupere chaque ligne de produit lié au table recupéré dans la facture
    for(let i=0; i<long; i++){

        console.log("id returné dans producline", returnLineProducts[0].productLine[i])

        returnEnd.push(await ProductsLine.find({_id: returnLineProducts[0].productLine[i]}))

        console.log("producline trouvé", returnEnd)
    }*/


    return returnLineProducts
   }

   module.exports = {findUser,create, findAll,findAllFactureId};