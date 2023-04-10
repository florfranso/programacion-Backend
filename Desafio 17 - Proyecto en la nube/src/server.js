import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
//para trabajar con hbs traer el path de la ruta raiz, es de node
//para poder usar los archivos de las vistas
import path, { join } from 'path'
//libreria para encriptar contraseña
import options from './config/databaseConfig.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
//importo passport
import passport from 'passport';
//variables de entorno
import dotenv from 'dotenv';
dotenv.config()
//cluster
import cluster from 'cluster';
import os from 'os'
const numCores = os.cpus().length

import compression from 'compression';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//const productosApi = new Contenedor('productos.json')


//trabajo
//routers
import productsRouter from './routes/poducts.js';
import webRouter from './routes/webRoutes.js';
import authRouter from './routes/authRouter.js'


mongoose.set('strictQuery', false);
mongoose.connect(options.mongoDB.mongoUrlSessions, (err) => {
    if (err) return console.log(`Error al conectarse a la db ${err}`);
    console.log("conexion a la db exitosa :)")
});

//server
const app = express();


//modo fork
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${JSON.stringify(PORT)} con el proceso ${process.pid}`);
})
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});

app.use(express.json()); //lectura de json desde el cuerpo de la peticion
app.use(express.urlencoded({ extended: true })); //lectura de json desde un metodo post de formulario
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
        mongoUrl: options.mongoDB.mongoUrlSessions,
        ttl: 600
    }),
    secret: process.env.SECRET_KEY,
    //definimos que se usara un almacenamiento externo para la sesiones.
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000 //20seg
    }
}));

//configurar passport
app.use(passport.initialize());//inicializar passport dentro de nuestro servidor
app.use(passport.session());
app.use(compression());


// routes
//view routes
app.use(webRouter);
//api routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/logout', webRouter);
app.use('/info', webRouter)





