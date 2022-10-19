const express = require('express')
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/DouCrochet";
const User = require('./app/services/newUser');
const product = require('./app/services/product.service');
const routers = require('./app/routes/product.router');
const cors = require('cors');

mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});
// Get the default connection

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PORT = serverConfig.PORT || 5000
const app = express()

const corsOptions = {
  origin:'*', 
  credentials: true, 
  optionsSuccessStatus:200,
  methods: "*"
}

app.use(cors(corsOptions));

app.use(express.json());
app.use('/products', routers);
app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))

app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));
