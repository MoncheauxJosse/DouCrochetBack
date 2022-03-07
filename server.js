const express = require('express')
const serverConfig = require('./app/config/server.config')


const PORT = serverConfig.PORT || 5000
const app = express()
//Routes
app.get('/api',(req,res) => res.status(200).send({message : 'test server'}))


app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`))