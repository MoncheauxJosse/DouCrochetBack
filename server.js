const express = require('express')
const cors = require('cors')
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/DouCrochet";
const User = require('./app/services/newUser')
const produstRoute = require('./app/routes/product.router')




mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});
// Get the default connection

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PORT = serverConfig.PORT || 5000
const app = express()


//Utilisation d'un middleware json
app.use(express.json())

// a modifier , il faut que cors n'accepte que le front doucrochet 
app.use(cors({origin:"*"}))


app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))

//appel la route ProductRoute
app.use('/creerProduit',produstRoute)

app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));


