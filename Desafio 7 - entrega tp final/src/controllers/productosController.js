import getTime from "../helpers/getTime.js"

const productos = [{
    id: 1,
    code: "A1",
    name: 'Guitarra Cort Z44',
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, modi.",
    price: 137922.75,
    stock: 10,
    url: 'https://http2.mlstatic.com/D_NQ_NP_632536-MLA48208174035_112021-O.webp'
},
    {
        id: 2,
        code: "B1",
        name: 'Kit De Batería Electrónica Behringer Xd8usb 8 Piezas',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, modi.",
        price: 174618.73,
        stock: 10,
        url: 'https://http2.mlstatic.com/D_NQ_NP_963956-MLA31621294374_072019-O.webp'
    },
    {
        id: 3,
        code: "C1",
        name: 'Bajo Eléctrico 4 Cuerdas Yamaha Trbx174bl',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, modi.",
        price: 122886.64,
        stock: 10,
        url: 'https://http2.mlstatic.com/D_NQ_NP_728801-MLA46925273219_072021-O.webp'
    },
    {
        id: 4,
        code: "D1",
        name: 'Cabezal Para Guitarra Mesa Boogie Dual Rectifier',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, modi.",
        price: 1119590,
        stock: 10,
        url: 'https://http2.mlstatic.com/D_NQ_NP_615676-MLA31593269319_072019-O.webp'
    },
    {
        id: 5,
        code: "E1",
        name: 'Caja Mesa Boogie 4x10 Traditional Power House Made In Usa',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, modi.",
        price: 708484.76,
        stock: 10,
        url: 'https://http2.mlstatic.com/D_NQ_NP_615314-MLA48110054685_112021-O.webp'
    },
    {
        id: 6,
        code: "E2",
        name: 'Caja',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, modi.",
        price: 15000,
        stock: 10,
        url: 'https://http2.mlstatic.com/D_NQ_NP_615314-MLA48110054685_112021-O.webp'
    }]

const obtenerProductos = async (req, res) => {
    res.json(productos)
}

const obtenerProdById = async (req, res) => {
    const { id } = req.params
    if (id) {
        const producto = productos.find(producto => producto.id === Number(id))
        const response = producto ? { status: 'Ok', data: producto } : { Error: 'Producto no encontrado', data: null }
        const statusCode = producto ? 201 : 404
        res.status(statusCode).json(response)
    } else {
        res.json({
            msg: 'get API - controlador mostrado',
            id,
            productos
        })
    }
}

const agregarProducto = async (req, res) => {
    const { name, id, description, code, url, price, stock } = req.body
    const date = getTime()
    productos.push({ name, id, description, code, url, price, stock, date })
    res.json(productos)
}

const editarProducto = async (req, res) => {

    const { id } = req.params
    try {
        const editarProducto = productos.find((producto) => producto.id === id)
        const index = productos.indexOf(editarProducto);
        if (!editarProducto) {
            res.status(404).json({ message: "Producto no encontrado" })
        }
        else {
            const { name, id, description, code, url, price, stock } = req.body
            const date = getTime()
            productos[index] = { name, id, description, code, url, price, stock, date }
            res.json(productos[index])
        }
    } catch (error) {
        res.status(404).json({ message: "error" })
    }
}

const eliminarProducto = async (req, res) => {
    const { id } = req.params
    try {
        const productoFind = productos.find((producto) => producto.id === id)
        if (!productoFind) {
            res.status(404).json({ message: "Producto no encontrado" })
        }
        else {
            const index = productos.indexOf(productoFind)
            productos.splice(index, 1)
            res.json(productos)
        }
    }
    catch (error) {
        res.status(404).json({ message: "error" })
    }
}

export { obtenerProductos, obtenerProdById, agregarProducto, editarProducto, eliminarProducto }