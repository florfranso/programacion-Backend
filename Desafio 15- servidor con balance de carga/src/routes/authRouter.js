import express from 'express';
import passport from 'passport';
import { Strategy } from "passport-local";//usuario y contrasena
import { UserModel } from '../models/user.model.js';
import { checkLogged, userNotLogged } from '../middlewares/auth.js';
//para encriptar contraseñas
import bcrypt from 'bcrypt';



const authRouter = express.Router();
//constante de la estretegia que vamos a usar
const LocalStrategy = Strategy;

// Metodos de Auth con Bcrypt
async function generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password)
    console.log(`pass login: ${password} || pass hash: ${usuario.password}`)
    return match
}

//serializacion y deserealizacion
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const existeUsuario = await readUser(id);
    done(null, existeUsuario)
})
/*passport.deserializeUser((id, done) => {
    //verificamos si el usuario existe en la base de datos
    UserModel.findById(id, (err, userDB) => {
        return done(err, userDB);
    })
});*/


//crear estrategias para registrar a los usuarios
/*
    Passport LocalStrategy, utiliza dos valores esperados llamados username y password, por lo que dentro del formulario 'login' debe contener estos dos imputs con su respectivo nombre.
*/

/*passport.use("signupStrategy", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email"
    },
    (req, username, password, done) =>{
        console.log(`${username} ${password}`)
        //Logica para validar si un usuario existe
        UserModel.findOne ({email:username}, (err, userFound)=>{
            if(err) return done (err);
            if(userFound) return done (null,false,{message:"El usuario ya existe"})
            const newUser = {
                name:req.body.name,
                email:username,
                password:password
            };
            UserModel.create(newUser,(err, userCreated)=>{
                if(err) return done(err,null,{message:"Hubo un error al registrar el usuario"})
                return done(null,userCreated, {message:"Usuaurio creado"})
            })
        })
    }))*/
async function addUser(usuario) {

    try {
        const user = usuario
        const userSave = new UserModel(user);
        const savedUser = await userSave.save();
        console.log(savedUser, 'dentro de addUser()')
    } catch (error) {
        console.log(error)
    }
}
async function readUser(usuario) {
    try {
        const userRead = await model.UserModel.findOne({email: usuario})
        console.log(userRead, 'leido desde DB mongo')
        return userRead
    } catch (error) {
        
    }
}

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const existeUsuario = await readUser(username)
        if (!existeUsuario) {
            return done(null, false)
        } else {
            const match = await verifyPass(existeUsuario, password)

            if (!match) {
                return done(null, false)
            }
            return done(null, existeUsuario)
        }
    }
))


/*
authRouter.post("/login", (req, res) => {
    const { username } = req.body;
    if (username) {
        //crear la sesion
        req.session.username = username;
        res.redirect("/perfil");
    } else {
        res.render('login-error')
    }
});*/


authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/perfil',
    failureRedirect: '/login-error'
}));



authRouter.get('/home', checkLogged, (req, res) => {
    const datosUsuario = {
        nombre: req.session.name,
        email: req.session.email
    }
    res.render('home', { datos: datosUsuario });
})


/*authRouter.post('/register', passport.authenticate("singupStrategy", {
    failureRedirect: "/registro-error",
    failureMessage: true //req.sessions.messages=[]
}),
    (req, res) => {
        res.redirect("/home")
    });*/

authRouter.post('/register', async (req, res) => {
    const { name, password, email } = req.body;

    const newUsuario = await readUser(name)

    if (newUsuario) {
        res.render('registro-error')
       // res.redirect('registro-error')
    } else {
        const newUser = { name, password: await generateHashPassword(password), email }
        //UserModel.push(newUser);
        addUser(newUser)
        res.render('login')
    }
})

authRouter.get('/perfil', checkLogged, (req, res) => {
    /*if (!req.user.contador) {
        req.user.contador = 1
    } else {
        req.user.contador++
    }*/
    const datosUsuario = {
        nombre: req.session.name,
        email: req.session.email
    }
    res.render('datos', { datos: datosUsuario });
})

authRouter.post('/perfil', async(req, res) => {
    const nuevoProducto = req.body;
    const result = await productosApi.save(nuevoProducto);
    res.redirect('/datos')
})


authRouter.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.redirect("/")
        } else {
            res.render("logout")
        }
    })
});


export default authRouter;