//const express = require("express");
import express from 'express';
//const Contenedor = require("../containers/contenedorProductos");
import Contenedor from "../containers/contenedorProductos.js";
//const {checkLogged, userNotLogged} = require("../middlewares/auth");
import { checkLogged ,userNotLogged } from '../middlewares/auth.js';

//service
const productosApi = new Contenedor("productos.txt");

const router= express.Router();

router.get('/', checkLogged, (req,res)=>{
    res.render('home',{username:req.session.username});
});


router.get('/productos',checkLogged,async(req,res)=>{
    res.render('products',{products: await productosApi.getAll()})
});

router.get("/login",userNotLogged,(req,res)=>{
    res.render("login");
});


router.get('/logout', (req,res)=>{
    res.render('logout',{username:req.session.username});
});

router.get('/register', (req, res)=>{
    res.render("registro");
})

//module.exports ={WebRouter:router};
export default {WebRouter:router}