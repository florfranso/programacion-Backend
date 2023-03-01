import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
//normalizar msj
import { normalize, schema, denormalize } from 'normalizr'
import util from 'util'

import faker from 'faker'
faker.locale = 'es'

import ContenedorDB from './contenedores/contenedorDB.js'
import ContenedorMemoria from './contenedores/ContenedorMemoria.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorDB(config.mysql, 'productos')
const mensajesApi = new ContenedorMemoria('./contenedores/mensajes.json')

//--------------------------------------------
// configuro el socket

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.on('nuevoProducto', data => {
        productosApi.save(data)
        .then(()=>{
            productosApi.getAll()
                .then((res) => {
                socket.emit('productos', res) 
            })
        })
    })

    productosApi.getAll()
        .then((res) => {
            socket.emit('productos', res)
        })


//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES

function print(objeto) {
    console.log(util.ispect(objeto, false, 12, true));
}

// Definimos un esquema de autor
const author = new schema.Entity('autor', {},
    { idAttribute: 'email' }
)

// Definimos un esquema de mensaje
const mensajes = new schema.Entity('text', {
    autor: author
})

// Definimos un esquema de posts

const posts = new schema.Entity('posts', {
    mensajes: [mensajes]
})

function normalizarMensajes(mens) {
    const normalizeMensajes = normalize(mens, posts);
    print(normalizeMensajes)
    console.log("RESULTADO FUNCION: ", normalizeMensajes);
    return normalizeMensajes

}



io.on("new-message", async data => {
    // carga inicial de mensajes
    try {
        await mensajesApi.save(data)
        const listaMensajes = await mensajesApi.getAll();
        const dataNormalizada = normalizarMensajes(listaMensajes)
        io.emit('mensaje', dataNormalizada)
    } catch (error) {
        console.log("Error al normalizar: ", error)
    }
})

    // actualizacion de mensajes
    mensajesApi.getAll()
        .then((res) => {
            io.emit('mensajes', res)
        })
});



//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use ('/', express.static('../public'))

//-------------------------------------------
function creaCombinacionesRandom() {
    return {
        producto: faker.commerce.productName(),
        price: faker.commerce.price(),
        url: faker.system.filePath(),
    }
}
app.get('/api/productos-test', (req, res) => {
    const objs = [];
    for (let i = 0; i < 10; i++) {
        objs.push(creaCombinacionesRandom())
    }
    res.json(objs)
})



//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))