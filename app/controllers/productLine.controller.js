const productLineService = require('../services/productline.service')

const insert = async(body, res) => {
    productLineService.create(body)
    .then((body)=> {
        res.status(200).send({
            message : 'Produit ajouté',
            body,
        })
    }
    ).catch(() => {
        res.status(500).send({
            message: "un probleme est survenu",
        });
    
    })
}

module.exports = {insert}