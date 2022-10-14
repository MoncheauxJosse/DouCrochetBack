const Role = require('../models/role.model')

    const getRole = (res, req) =>{
        Role.find((error, data)=>{
            if(error)
            res.status(500).send({message : error.message})
            else
            res.send(data);
        })
    }
    module.exports = {getRole};
    // const insertRole = ()=>{
        // verifie si on est connecté
       // si le role existe tu ne me creer pas la ligne sinon tu créer la ligne

       //const getservice = await getRole()

        // console.log("coucou insert")
        // const client = new Role({
        //     role: "client",
        // })
        // client.save()
        // return "ok"    
        // const moderateur = new Role({
        //     role: "moderateur",
        //  })
        // moderateur.save()     
        // const admin = new Role({
        //     role: "admin",
        //  })
        // admin.save()
    //  }





// const callRole =()=>{
//     const userclient = new Role({
//         role:"client",
//     })
//     const usermoderateur = new Role({
//         role:"moderateur",
//     })
//     const useradmin = new Role({
//         role:"admin",
//     })

// }



