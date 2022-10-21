const getuser = require('../services/user.service')

const getusers = async (req,res) => {
//     console.log("getusers");
//    getuser().then(res => console.log(res)).catch(err => console.log(err));
//    console.log(await getuser());
   // res.send(await getuser());
   getuser().then(response => res.send(response)).catch(err => res.send(err));

    
   

};

module.exports = {getusers};