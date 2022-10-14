const express = require('express')
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/DouCrochet";
const User = require('./app/services/newUser')
const userRouter = require('./app/routes/user.router')

mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});
// Get the default connection

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PORT = serverConfig.PORT || 5000
const app = express()

app.use(express.json())
app.use("/users", userRouter);

app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))


app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));


