import express from 'express';
import passport from 'passport';
//import {Strategy as LocalStrategy} from 'passport-local';
import { Strategy } from 'passport-local';
//import { UserModel } from '../models/user.model';


//constante de la estretegia que vamos a usar
const LocalStrategy = Strategy;

//serializacion y deserealizacion
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //verificamos si el usuario existe en la base de datos
    UserModel.findById(id,(err,userDB)=>{
        return done(err,userDB);
    })
}); 

//crear estrategias para registrar a los usuarios

const authRouter = express.Router();
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

/*/*----------- Passport -----------*/

/*
    Passport LocalStrategy, utiliza dos valores esperados llamados username y password, por lo que dentro del formulario 'login' debe contener estos dos imputs con su respectivo nombre.
*/
/*
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
));*/ 
authRouter.post('/login', (req, res) => {
    const { nombre, password } = req.body

    //const existeUsuario = usuariosDB.find(usuario => usuario.nombre == nombre && usuario.password == password)

    if (!existeUsuario) {
        res.render('login-error.hbs')
    } else {
        req.session.nombre = nombre;

        res.redirect('/')
    }
})

authRouter.get('/home', (req, res) => {
    if (req.session.nombre) {


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

authRouter.post('/register', (req, res) => {
    const { nombre, password, direccion } = req.body;

    const usuario = usuariosDB.find(usr => usr.nombre == nombre)

    if (usuario) {
        res.render('registro-error.hbs')
    } else {
        usuariosDB.push({ nombre, password, direccion })
        res.render('login')
    }
})


authRouter.get("/logout",(req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            res.redirect("/")
        } else{
            res.render("logout")
        }
    })
});

export default authRouter;