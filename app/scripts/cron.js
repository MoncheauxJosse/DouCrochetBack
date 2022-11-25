const CronJob = require('cron').CronJob;
const categoryService = require('../services/category.service')
const ProductService = require("../services/product.service");
const ProductLine = require("../services/productline.service")


async function task(){

    
    // recupere les differente categorie
   let existTopPRoduct =  await categoryService.findOneCategoryId('topProduit')
    
    // si il n'existe pas le nom "topProduit" dans les categories
   if(existTopPRoduct[0]==undefined){
        //creer la categorie
        const categoryTop = await categoryService.createCategory({name:'topProduit'})
        //refet un findall pour recuperer toute les categorye
       
    }  

    existTopPRoduct =  await categoryService.findOneCategoryId('topProduit')

    // recupere les produit etant deja topProduits
    const productTop= await ProductService.findAllSearch(existTopPRoduct[0]._id)


    for (let index = 0; index < productTop.length; index++) {

        const indexCategorySup =productTop[index].category.indexOf(existTopPRoduct[0]._id)

        const indexEndSup =indexCategorySup +1
        //retire la category TopProduit du produit

         productTop[index].category.splice(indexCategorySup,indexEndSup)

        ProductService.UpdateProduct(productTop[index]._id,{category: productTop[index].category})
        
    }

    //reset la category topProduit
    categoryService.refreshRelation(existTopPRoduct[0]._id)

    let tabRelation= new Array()
    // recupere tout les produit
    ProductService.findAll().then(response => { 


        // long = nombre d'objet Product Total
        const long=response.length

        // recupere les factures
         ProductLine.findAll().then(facture=>{

            //la boucle for sort chaque produit 1 par 1
           for (let index = 0; index < long; index++) {

                 // recherche TOUTES les facture de vente lié au produit sortie
                const productFacture = facture.filter(element => element.product==response[index].id)

                // initie la somme de vente a 0 
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

            



            // modifie la category de chaque produit pour ajouter la categorie top Produit !!!!!

            let max
            if(existTopPRoduct.length < 10){

                max = existTopPRoduct.length

            }else{

                max = 10
            }
           
            for(let index = 0; index < max; index++){


                result[index].product.category.push(existTopPRoduct[0]._id)

                // update recherche l objet a modifier et modifie la valeur demander
                ProductService.UpdateProduct( result[index].product._id ,
                    {category: result[index].product.category})

                    //lie l objet topProduct avec l'objet (recupere l id du produit)
                    categoryService.updateRelation(existTopPRoduct[0]._id , result[index].product._id)
                  
            }
            
            console.log("cron effectuer")

        })
    })
}



const startCron = async () => {

    console.log("cron ")

    let date_ob = new Date();

    console.log(date_ob)

//const job = new CronJob('seconde minutes Heures jour mois jourSemaine',task);
const job = new CronJob('01 00 00 * * 2',task);

//const job = new CronJob('00 20 * * * *',task);


job.start();
}


module.exports = {startCron,task};