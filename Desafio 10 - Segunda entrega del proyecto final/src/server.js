import express from 'express'
const { Router } = express

import {
    productosDao as productosApi,
    carritosDao as carritosApi
} from './daos/index.js'

// fecha y hora
const getTime = () => {
    const date = new Date().toLocaleString()
    return date
}
//genero id
const generarId = () => {
    let id = Math.floor(Math.random() * 100) + 1
    let carritos = fs.readFileSync("../DB/carritos.json", "utf-8")
    carritos = JSON.parse(carritos)
    let carrito = carritos.find((carrito) => carrito.id === id)
    if (carrito) {
        id = generarId()
    }
    return id;
}

//------------------------------------------------------------------------
// instancio servidor

const app = express()

//--------------------------------------------
// permisos de administrador

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    res.json(productosApi)
})

productosRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    if (id) {
        const producto = productosApi.find(producto => producto.id === Number(id))
        const response = producto ? { status: 'Ok', data: producto } : { Error: 'Producto no encontrado', data: null }
        const statusCode = producto ? 201 : 404
        res.status(statusCode).json(response)
    } else {
        res.json({
            msg: 'get API - controlador mostrado',
            id,
            productosApi
        })
    }
}
)

productosRouter.post('/', soloAdmins, async (req, res) => {
    const { title, thumbnail, price, stock } = req.body
    let id;
    productosApi.length === 0? id = 1 : id = productosApi[productosApi.length - 1].id + 1 
    const date = getTime()
    productosApi.push({ title, thumbnail, price, stock, date })
    res.json(productosApi)
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const { id } = req.params
    try {
        const editarProducto = productosApi.find((producto) => producto.id === id)
        const index = productosApi.indexOf(editarProducto);
        if (!editarProducto) {
            res.status(404).json({ message: "Producto no encontrado" })
        }
        else {
            const { name, id, description, code, url, price, stock } = req.body
            const date = getTime()
            productosApi[index] = { name, id, description, code, url, price, stock, date }
            res.json(productosApi[index])
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const { id } = req.params
    try {
        const productoFind = productosApi.find((producto) => producto.id === id)
        if (!productoFind) {
            res.status(404).json({ message: "Producto no encontrado" })
        }
        else {
            const index = productosApi.indexOf(productoFind)
            productosApi.splice(index, 1)
            res.json(productosApi)
        }
    }
    catch (error) {
        res.status(404).json({ message: "error" })
    }
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    res.json(carritosApi)
})

carritosRouter.post('/', async (req, res) => {
        const carrito = new carritosApi()
        carrito.id = generarId()
        carrito.timestamp = getTime()
        carritosApi.push(carrito)
        fs.writeFileSync("../DB/carritos.json", JSON.stringify(carritosApi, null, 2))
        res.json(carrito)
})

carritosRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const carrito = fs.readFileSync("./db/carritos.txt", "utf-8")
        const carritos = JSON.parse(carrito)
        const carritoIdFind = carritos.find((carrito) => carrito.id == id)
        if (!carritoIdFind) {
            res.status(404).json({ message: "Carrito no encontrado" })
        }
        else {
            const carritoFiltrado = carritos.filter((carrito) => carrito.id != id)
            fs.writeFileSync("./db/carritos.txt", JSON.stringify(carritoFiltrado, null, 2))
            res.json(carritoFiltrado)
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }
})

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    try {
        const carrito = fs.readFileSync("./db/carritos.txt", "utf-8")
        const carritos = JSON.parse(carrito)
        const carritoIdFind = carritos.find((carrito) => carrito.id == id)
        if (!carritoIdFind) {
            res.status(404).json({ message: "Carrito no encontrado" })
        }
        else {
            res.json(carritoIdFind)
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const { producto } = req.body
    try {
        const carrito = fs.readFileSync("../DB/carritos.json", "utf-8")
        const carritos = JSON.parse(carrito)
        const carritoIdFind = carritos.find((carrito) => carrito.id == id)
        if (!carritoIdFind) {
            res.status(404).json({ message: "Carrito no encontrado" })
        }
        else {
            const productoToAdd = {
                timestamp: getTime(),
                id: generarId(),
                title: producto.title,
                thumbnail: producto.thumbnail,
                price: producto.price,

            };
            carritoIdFind.productos.push(productoToAdd)
            fs.writeFileSync("../DB/carritos.json", JSON.stringify(carritos, null, 2))
            res.json(carritoIdFind)
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }

})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const { idProducto } = req.body
    const { id } = req.params
    try {
        const carrito = fs.readFileSync("../DB/carritos.json", "utf-8")
        const carritos = JSON.parse(carrito)
        const carritoIdFind = carritos.find((carrito) => carrito.id == id)
        if (!carritoIdFind) {
            res.status(404).json({ message: "Carrito no encontrado" })
        }
        else {
            const productoBuscado = carritoIdFind.productos.filter((producto) => producto.id == idProducto)
            if (!productoBuscado) {
                res.status(404).json({ message: "Producto no encontrado" })
            }
            else {
                const productoFiltrado = carritoIdFind.productos.filter((producto) => producto.id != idProducto)
                carritoIdFind.productos = productoFiltrado
                fs.writeFileSync("../DB/carritos.json", JSON.stringify(carritos, null, 2))
                res.json(carritoIdFind)
            }
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

export default app