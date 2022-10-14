const express = require('express')
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/DouCrochet";
const user = require('./app/models/user.model')
const controlleruser = require('./app/controllers/usercontroller')
mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});
// Get thconste default connection

const db = mongoose.connection;
// const db = user.db("DouCrochet);
console.log("hello");



// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PORT = serverConfig.PORT || 5000
const app = express()
app.get('/users' , controlleruser.getusers);
    
    // user.find().then((error, results) => {
    //     if (error)  { return res.send(error)}
    //     console.log(results);
    //      res.status(200).send({ results});
    //  });
 
  

app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))

app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));


