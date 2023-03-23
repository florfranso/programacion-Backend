import express from 'express';
import Contenedor from "../containers/contenedorProductos.js";
import { checkLogged ,userNotLogged } from '../middlewares/auth.js';
import path  from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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

webRouter.get('/info', (req, res) => {
    res.send(`<p>Argumentos de entrada: ${process.argv.slice(2)}</p><br><p>Sistema operativo: ${process.platform}</p><br><p>Versión de node: ${process.version}</p><br><p>Memoria total reservada: ${process.memoryUsage().rss}</p><br><p>Path de ejecucion: ${process.cwd()}</p><br><p>Process Id: ${process.pid}</p><br><p>Carpeta del proyecto: ${path.basename(__dirname)}</p>`)
})
export default webRouter;