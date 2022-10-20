const express = require('express')
const cors = require ('cors');
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/DouCrochet";
// const user = require('./app/models/user.model')
// const controlleruser = require('./app/controllers/usercontroller')
const userrouter = require('./app/routes/user.route');
// const adminrouter = require('./app/controllers/usercontroller')
mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB');
});

// Get thconste default connection

const db = mongoose.connection;
// const db = user.db("DouCrochet);
console.log("hello");



// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PORT = serverConfig.PORT || 5000
const app = express()
 
    const corsOptions = {
        origin:'http://127.0.0.1:5173', 
        credentials: true, 
        optionsSuccessStatus:200,
        methods: "*"
    }
    
    app.use(cors(corsOptions));
    app.use(express.json());

    

    app.use("/users" , userrouter);
    // app.use("/admin" , adminrouter);
  

app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))

app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));


