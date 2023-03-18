import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
//para trabajar con hbs traer el path de la ruta raiz, es de node
//para poder usar los archivos de las vistas
import path from 'path'
//libreria para encriptar contraseña
import bycrypt from 'bcrypt';
import options from './config/databaseConfig.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose'
//importo passport
import passport from 'passport';
//variables de entorno
import dotenv from 'dotenv';
dotenv.config()


mongoose.set('strictQuery', false);
mongoose.connect(options.mongoDB.mongoUrlSessions,(err)=> {
    if(err) return console.log(`Error al conectarse a la db ${err}`);
    console.log("conexion a la db exitosa :)")
});

//server
const app = express();


app.use(express.json()); //lectura de json desde el cuerpo de la peticion
app.use(express.urlencoded({extended:true})); //lectura de json desde un metodo post de formulario
//archivos estaticos
app.use(express.static('src/public')); //ruta carpeta publica


//configuracion template engine handlebars
app.set('views', 'src/views');
app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


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

//configurar passport
app.use(passport.initialize());//inicializar passport dentro de nuestro servidor
app.use(passport.session());


//routers
//const {productsRouter} = require('./routes/poducts.js');
import productsRouter from './routes/poducts.js';
//const {WebRouter} = require("./routes/webRoutes");
import webRouter from './routes/webRoutes.js';
//const {AuthRouter} = require("./routes/authRouter");
import authRouter from './routes/authRouter.js'
// routes
//view routes
app.use(webRouter);
//api routes
app.use('/api/products',productsRouter);
app.use('/api/auth', authRouter);
app.use('/logout', webRouter)

/*============================[Servidor]============================*/
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});

