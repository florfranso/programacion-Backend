//const express = require("express");
import express from 'express'

const router = express.Router();
/*
router.post("/login",(req,res)=>{
    const {name} = req.body;
    if(name){
        //crear la sesion
        req.session.username = name;
        res.redirect("/");
    } else{
        // res.json({error:"por favor ingresa el nombre"})
        res.render("login",{error:"POR FAVOR INGRESE EL NOMBRE"})
    }
});*/
app.post('/login', (req, res) => {
    const { nombre, password } = req.body

    //const existeUsuario = usuariosDB.find(usuario => usuario.nombre == nombre && usuario.password == password)

    if (!existeUsuario) {
        res.render('login-error.hbs')
    } else {
        req.session.nombre = nombre;

        res.redirect('/')
    }
})

app.get('/home', (req, res) => {
    if (req.session.nombre) {
        req.session.contador++

        const datosUsuario = usuariosDB.find(usuario => {
            return usuario.nombre == req.session.nombre
        })

        res.render('home', {
            datos: datosUsuario,
        })
    } else {
        res.redirect('/login')
    }
})

app.post('/register', (req, res) => {
    const { nombre, password, direccion } = req.body;

    const usuario = usuariosDB.find(usr => usr.nombre == nombre)

    if (usuario) {
        res.render('registro-error.hbs')
    } else {
        usuariosDB.push({ nombre, password, direccion })
        res.render('login')
    }
})


router.get("/logout",(req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            res.redirect("/")
        } else{
            res.render("logout")
        }
    })
});

export default {AuthRouter:router};