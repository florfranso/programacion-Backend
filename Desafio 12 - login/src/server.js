const express = require('express');
//routers
const {productsRouter} = require('./routes/poducts.js');
const {WebRouter} = require("./routes/webRoutes");
const {AuthRouter} = require("./routes/authRouter");

const handlebars = require('express-handlebars');
const {options} = require("./config/databaseConfig");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

//server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

//configuracion template engine handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

//configuracion de la session
app.use(cookieParser());
app.use(session({
    //definir el sistema donde vamos a almacenar las sesiones
    store: MongoStore.create({
        mongoUrl:options.mongoDB.mongoUrlSessions,
        ttl:600
    }),
    secret:"clavesecreta",
    //definimos que se usara un almacenamiento externo para la sesiones.
    resave:false,
    saveUninitialized:false
}));

// routes
//view routes
app.use(WebRouter);
//api routes
app.use('/api/products',productsRouter);
app.use('/api/auth', AuthRouter);
app.use('/logout', WebRouter)

//express server
const server = app.listen(8080,()=>{
    console.log('listening on port 8080')
})