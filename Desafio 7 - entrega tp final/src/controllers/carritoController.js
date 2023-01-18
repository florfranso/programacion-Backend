import getTime from "../helpers/getTime.js"
import generarId from "../helpers/generarId.js"
import fs from "fs";

class Carrito {
    constructor() {
        this.id = null
        this.timestamp = null
        this.productos = []
    }

    agregarProducto(producto) {
        this.productos.push(producto)
    }
}

const carritos = []
// generar carrito con su ID y guardarlo en el archivo carritos.txt

const generarCarrito = (req, res) => {
    const carrito = new Carrito()
    carrito.id = generarId()
    carrito.timestamp = getTime()
    carritos.push(carrito)
    fs.writeFileSync("./db/carritos.txt", JSON.stringify(carritos, null, 2))
    res.json(carrito)
}

const deleteCarrito = async (req, res) => {

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
}
// le sumo productos al carrito generado anteriormente buscado por su ID 

const agregarProductoID = async (req, res) => {
    const { id } = req.params
    const { producto } = req.body
    try {
        const carrito = fs.readFileSync("./db/carritos.txt", "utf-8")
        const carritos = JSON.parse(carrito)
        const carritoIdFind = carritos.find((carrito) => carrito.id == id)
        if (!carritoIdFind) {
            res.status(404).json({ message: "Carrito no encontrado" })
        }
        else {
            const productoToAdd = {
                timestamp: getTime(),
                id: generarId(),
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                codigo: producto.codigo,
                foto: producto.foto,
                precio: producto.precio,
                stock: producto.stock

            };
            carritoIdFind.productos.push(productoToAdd)
            fs.writeFileSync("./db/carritos.txt", JSON.stringify(carritos, null, 2))
            res.json(carritoIdFind)
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }
}
// visualizamos el carrito con su ID todos sus productos 

const getCarritoById = async (req, res) => {
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
}
// elimina un producto del carrito por su ID 

const deleteProductoById = async (req, res) => {
    const { idProducto } = req.body
    const { id } = req.params
    try {
        const carrito = fs.readFileSync("./db/carritos.txt", "utf-8")
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
                fs.writeFileSync("./db/carritos.txt", JSON.stringify(carritos, null, 2))
                res.json(carritoIdFind)
            }
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }
}

export { generarCarrito, deleteCarrito, agregarProductoID, getCarritoById, deleteProductoById }