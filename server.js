const express = require('express')
const serverConfig = require('./app/config/server.config')
const cors = require('cors')
const mongoose = require("mongoose");
const BddCreate = require('./app/scripts/createBdd.script') 
const path = require('path')
const job = require('./app/scripts/cron')

const RoleRoutes = require('./app/routes/role.router')
const UserRoutes = require('./app/routes/user.router')
const ProductRoutes = require('./app/routes/product.router');
const CategoryRoutes = require('./app/routes/category.router');
const SupportRoutes = require('./app/routes/support.router');
const AdminRoutes = require('./app/routes/product.router');
const CookieRoutes = require('./app/routes/cookie.router');
const OrdersRoutes = require('./app/routes/orders.router');
const cookieParser = require('cookie-parser')

const { constants } = require('fs/promises');

const mongoDB = process.env.DB_LOCAL;
const url = process.env.DB_LIVE;
const PORT = serverConfig.PORT || 5000
const app = express()

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
// Pour se connecter en local
// mongoose.connect(mongoDB).then(r => {
//      console.log('Connected to MongoDB local')
//  });

//Pour se connecter au live
mongoose.connect(url, connectionParams).then(() => {
    console.log("Connected to MongoDB live")
})
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
});

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));

BddCreate.insertRoleBDD()

const corsOptions = {
    origin:'http://127.0.0.1:5173',
    credentials: true,
    optionsSuccessStatus:200,
    methods: "*",
    exposedHeaders: ["SET-COOKIE"]
}

job.task()
job.startCron()

app.use(cookieParser())


app.use(cors(corsOptions));

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/role", RoleRoutes)
app.use("/users", UserRoutes);
app.use('/products', ProductRoutes);
app.use('/products', CategoryRoutes);
app.use('/admin', AdminRoutes)

app.use('/support', SupportRoutes);
app.use('/cookie', CookieRoutes);
app.use('/orders', OrdersRoutes);

app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));


