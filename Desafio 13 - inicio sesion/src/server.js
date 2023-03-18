// require  const express = require('express');
import express from 'express'
// require const session = require("express-session");
import session from 'express-session'
// require const handlebars = require('express-handlebars');
import handlebars from 'express-handlebars'
//para trabajar con hbs traer el path de la ruta raiz, es de node

//para poder usar los archivos de las vistas
import path from 'path'
//libreria para encriptar contraseña
import bycrypt from 'bcrypt';
//variables de entorno
import dotenv from 'dotenv';
dotenv.config()

//importo passport
import passport from 'passport';
import { Strategy } from 'passport-local';
//constante de la estretegia que vamos a usar
const LocalStrategy = Strategy;

//server
const app = express();

/*----------- Passport -----------*/

/*
    Passport LocalStrategy, utiliza dos valores esperados llamados username y password, por lo que dentro del formulario 'login' debe contener estos dos imputs con su respectivo nombre.
*/

passport.use(new LocalStrategy(
    async function (username, password, done) {
        console.log(`${username} ${password}`)
        //Logica para validar si un usuario existe
        const existeUsuario = await usuariosDB.find(usuario => usuario.nombre == username);

        console.log(existeUsuario);

        if (!existeUsuario) {
            return done(null, false);
        } else {
            const match = await verifyPass(existeUsuario, password)

            if (!match) {
                return done(null, false)
            }
            return done(null, existeUsuario);
        }
    }
));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const existeUsuario = usuariosDB.find(usuario => usuario.nombre == nombre);
    done(null, existeUsuario);
//UserModel.findById(id, (error,userFound)=>{
    //return done (error, userFound)
//})
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('src/public'));


//routers
//const {productsRouter} = require('./routes/poducts.js');
import productsRouter from './routes/poducts.js';
//const {WebRouter} = require("./routes/webRoutes");
import WebRouter from './routes/webRoutes.js';
//const {AuthRouter} = require("./routes/authRouter");
import AuthRouter from './routes/authRouter.js'

//const {options} = require("./config/databaseConfig");
import options from './config/databaseConfig.js';
//const cookieParser = require("cookie-parser");
import cookieParser from 'cookie-parser';
//const MongoStore = require("connect-mongo");
import MongoStore from 'connect-mongo';


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

app.use(passport.initialize());
app.use(passport.session());

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

