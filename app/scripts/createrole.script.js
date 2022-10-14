const rolecreate = require('../services/role.service')
// const mongoose = require("mongoose");
// const mongoDB = "mongodb://localhost:27017/DouCrochet";

// mongoose.connect(mongoDB).then(r => {
//     console.log('Connected to MongoDB')
// });
// // Get the default connection

// const db = mongoose.connection;

const insertfunction = async ()=>{
    const insert = await rolecreate.insertrole()
    if(insert=="ok"){
        console.log("insertOk")
    }
    else{
        console.log("erreur")
    }

}
insertfunction()


