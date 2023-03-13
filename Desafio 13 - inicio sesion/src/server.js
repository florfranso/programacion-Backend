// require  const express = require('express');
import express from 'express'
// require const session = require("express-session");
import session from 'express-session'
// require const handlebars = require('express-handlebars');
import handlebars from 'express-handlebars'
//para trabajar con hbs traer el path de la ruta raiz, es de node
//para poder usar los archivos de las vistas
import path from 'path'
//variables de entorno
import dotenv from 'dotenv';
dotenv.config()


//server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('src/public'));


//routers
//const {productsRouter} = require('./routes/poducts.js');
import {productsRouter} from './routes/poducts.js';
//const {WebRouter} = require("./routes/webRoutes");
import {WebRouter} from './routes/webRoutes.js';
//const {AuthRouter} = require("./routes/authRouter");
import {AuthRouter} from './routes/authRouter.js'

//const {options} = require("./config/databaseConfig");
import {options} from './config/databaseConfig.js';
//const cookieParser = require("cookie-parser");
import cookieParser from 'cookie-parser';
//const MongoStore = require("connect-mongo");
import MongoStore from 'connect-mongo';


//configuracion template engine handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: 'handlebars'
}));
app.set('views', 'src/views');
app.set('view engine', 'handlebars');


//configuracion de la session
app.use(cookieParser());
app.use(session({
    //definir el sistema donde vamos a almacenar las sesiones
    store: MongoStore.create({
        mongoUrl:options.mongoDB.mongoUrlSessions,
        ttl:600
    }),
    secret: process.env.SECRET_KEY,
    //definimos que se usara un almacenamiento externo para la sesiones.
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 20000 //20seg
    }
}));


// routes
//view routes
app.use(WebRouter);
//api routes
app.use('/api/products',productsRouter);
app.use('/api/auth', AuthRouter);
app.use('/logout', WebRouter)


/*============================[Servidor]============================*/
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});

//express server
/*const server = app.listen(8080,()=>{
    console.log('listening on port 8080')
})*/