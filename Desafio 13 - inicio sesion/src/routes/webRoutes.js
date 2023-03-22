import express from 'express';
import Contenedor from "../containers/contenedorProductos.js";
import { checkLogged ,userNotLogged } from '../middlewares/auth.js';

//service
const productosApi = new Contenedor("productos.txt");

const webRouter= express.Router();

webRouter.get('/', checkLogged, (req,res)=>{
    res.render('home',{username:req.session.username});
});


webRouter.get('/productos',checkLogged,async(req,res)=>{
    res.render('products',{products: await productosApi.getAll()})
});

webRouter.get("/login",userNotLogged,(req,res)=>{
    res.render("login");
});


webRouter.get('/logout', (req,res)=>{
    res.render('logout',{username:req.session.username});
});

webRouter.get('/register', (req, res)=>{
    res.render("registro");
})

webRouter.get('/registro-error', (req,res)=>{
    res.render('registro-error')
})

webRouter.get('/login-error', (req, res)=>{
    res.render("login-error")
})

webRouter.get('/perfil',checkLogged ,(req, res)=>{
    res.render("perfil", {username:req.session.username},{email:req.session.email})
})

export default webRouter;