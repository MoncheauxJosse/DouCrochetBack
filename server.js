const express = require('express')
const serverConfig = require('./app/config/server.config')
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/DouCrochet";
const User = require('./app/models/User');

mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});
// Get the default connection

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PORT = serverConfig.PORT || 5000
const app = express()


app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))

app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));

const callUser = new User({
    firstname: 'Elisa',
    lastname: 'exemple',
    email: 'test@test.fr',
    password: 'exemple',
    birthdate: '1987-05-05'
})

callUser.save()
// .then((res) => console.log(res))
// .catch((err) => console.log(err))

// UserSchema.create({ name: "Elisa" }, function (err, callUser) {
//     if (err) console.log('test');
//     // saved!
//   });
