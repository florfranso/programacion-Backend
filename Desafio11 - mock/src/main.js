import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'
import ContenedorArchivo from './contenedores/ContenedorArchivo.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)

//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES
import { normalize, schema, denormalize } from 'normalizr'
import util from 'util'

import ContenedorMensajes from '../src/contenedores/ContenedorArchivo.js'
const mensaje = new ContenedorMensajes ('../DB/mensajes.json')

function print(objeto) {
    console.log(util.ispect(objeto, false, 12, true));
}

// Definimos un esquema de autor
const autor = new schema.Entity('autor', {},
    { idAttribute: 'email' }
)

// Definimos un esquema de mensaje
const mensajes = new schema.Entity('mensajes', {
    autor: autor
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

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos

    try {

        const listaProductos = await productosApi.getAll();
        socket.emit("new-connection", listaProductos);
        socket.on("new-product", data => {
            productosApi.save(data);
            io.sockets.emit("producto", data);
        });
    } catch (error) {
        console.log("error", error);
    }
})
// actualizacion de productos

io.on("new-message", async data => {
    // carga inicial de mensajes
    try {
        await mensaje.save(data)
        const listaMensajes = await mensajesApi.getAll();
        const dataNormalizada = normalizarMensajes(listaMensajes)
        io.emit('mensaje, dataNormalizada')
    } catch (error) {
        console.log("Error al normalizar: ", error)
    }

    // actualizacion de mensajes
    mensajes.getAll()
        .then((res) => {
            io.emit('mensaje', res)
        })
});



//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------

import faker from 'faker'
faker.locale = 'es'

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