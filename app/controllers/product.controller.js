
const ProductService = require("../services/product.service");
const ProductLine = require("../services/productline.service")


const findAll = async (req,res) => {
   ProductService.findAll().then(response => res.send(response)).catch(err => res.send(err));
};

const findAllNouveau = async (req,res) => {
    // recupere tout les produit
    ProductService.findAll().then(response => { 
        // les compare entre eux, avec leur date ,pour les trier
        const result = response.sort(function(a,b){
            return new Date(b.creation_date)-new Date(a.creation_date)
        }) 
         //return les 7 dernier produit créer
            res.send(result.slice(0, 7))
        }).catch(err => res.send(err));
    };

const create = (req, res) => {
    ProductService.create(req.body).then((data) => {
        res.status(201).send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Product.',
        });
    })
}

const findAllTop = async (req,res) => {

    let tabRelation= new Array()
    // recupere tout les produit
    ProductService.findAll().then(response => { 

        // long = nombre d'objet Product
        const long=response.length

        // recupere les facture
         ProductLine.findAll().then(facture=>{

            //la boucle for sort chaque produit 1 par 1
           for (let index = 0; index < long; index++) {

                 // recherche TOUTES les facture de vente lié au produit sortie
                const productFacture = facture.filter(element => element.product==response[index].id)

                let somme =0

                //si il y a des factures lié au produit
                if( productFacture.length !==0){

                    //recupere juste les quantité de toute les facture lié a UN SEUL PRODUIT et les additiones
                    for (let index = 0; index < productFacture.length; index++) {

                        somme =+ productFacture[index].quantity;
                
                    }
                }
                //lie et ajoute le produit et la somme du produit vendu dans un tableaux
                tabRelation.push({nbrVente: somme,product: response[index]})
            }
            //trie le tableaux de relation fraichement effectué
            const result = tabRelation.sort(function(a,b){
            
                return b.nbrVente-a.nbrVente
            }) 

    
            res.send(result)

        }).catch(err => res.send(err));
    }).catch(err => res.send(err));
    };


// const findOne = (req, res) => {
//     ProductModel.findById(req.params.id, (err, data) => {
//         if (err) {
//             if (err.kind === 'not_found') {
//                 res.status(404).send({
//                     message: `Not found Role with id ${req.params.id}.`,
//                 });
//             } else {
//                 res.status(500).send({
//                     message: `Error retrieving Role with id ${req.params.id}`,
//                 });
//             }
//         } else res.send(data);
//     });
// }
module.exports = {findAll, create, findAllNouveau,findAllTop};

