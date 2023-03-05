const express = require("express");
const router = express.Router();

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
});

router.get("/logout",(req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            res.redirect("/")
        } else{
            res.render("logout")
        }
    })
});

module.exports = {AuthRouter:router}