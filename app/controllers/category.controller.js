const CategoryService = require("../services/category.service");

const findAll = async (req,res) => {
    CategoryService.findAll().then(response => res.send(response)).catch(err => res.send(err));
};


const create = async (req,res,err)=>{

    //premiere lettre en Maj et les autres en minuscule
    function strUcFirst(a){ 
        return  (a+'').charAt(0).toUpperCase()+a.substr(1).toLowerCase()
    }
    // transforme des phrase ecrite en un tableaux (top nounours devient [top,nounours])
    let transformName = req.body.name.split(/(?:,| |_|-|<|>|@|!)+/g)

    // faire la supression de l index 0 si le tableau est vide a cette endroit!
    // car le split peut ajouter en index 0 une valeur vide
    if(transformName[0]==''){
        //sort la veuleur '' du tableaux 
        transformName.splice(0,1)
    }
    let MotFinal =''
    //recole les mots en camalcase premier mot minuscule, les suivant mot une maj et minuscule
    for (let index = 0; index < transformName.length; index++) {

        if(index>=1){
            let mot = strUcFirst(transformName[index].toString());
            MotFinal+=mot
        }else{
            MotFinal = transformName[index].toString().toLowerCase()
        }
     }
      //verification antiDuplicate 
      const existTopPRoduct =  await CategoryService.findAll()
      const duplicate = existTopPRoduct.some(o=>o.name.toLocaleLowerCase()=== MotFinal.toLocaleLowerCase())

      // si anti duplicate a retourné false ( donc pas de doublon)
        if(!duplicate ){           
            const translateObject= {name: MotFinal}
            CategoryService.createCategory(translateObject).then((data) => res.status(201).send(data))
            .catch((err) => {
               res.status(500).send({
                   message: err.message || 'Some error occurred while creating the Product.',
               });
           })
        }else{

            res.status(500).send({
                message: err.message || 'La catégorie existe déja !',
            });
        }   
}
module.exports = {findAll,create};