const express = require('express')
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/DouCrochet";
const User = require('./app/services/user.service')
const roleservice = require('./app/services/role.service')
const roleRoute = require('./app/routes/role.router')

// roleservice.insertrole()

const rolecontroller = require ('./app/controllers/role.controller')

mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});
// Get the default connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// const dbconnection = ()=>{
//     return db
// }
// dbconnection()
// Bind connection to error event (to get notification of connection errors)

const PORT = serverConfig.PORT || 5000
const app = express()

app.use("/role", roleRoute)
// const routers = require("./app/routes");
// for (const route in routers) {
//     const router = new routers[route]().router;
//     app.use(`/${route}`, router, auth);
//   }

app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))

app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));

// const roletest = roleservice.getRole()
// console.log(roletest)

// const getRole = async () =>{ 
//     const dbconnect = await dbconnection()
//     const result = await roleservice.insertRole();
//     console.log(result)
//     return result
// }
// getRole()


