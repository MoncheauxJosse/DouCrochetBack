const express = require('express')
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/DouCrochet";
// const User = require('./app/services/user.service')
// const roleservice = require('./app/services/role.service')
const roleRoute = require('./app/routes/role.router')
const userRoute = require('./app/routes/user.router')
const cors = require ('cors')


const rolecontroller = require('./app/controllers/role.controller')

mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});
// Get the default connection
const db = mongoose.connection;
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

app.use(express.json())

app.use("/role", roleRoute)
app.use("/user", userRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

