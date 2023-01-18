const express = require("express");
const Contenedor = require("./Contenedor");

const router = express.Router();
const contenedor = new Contenedor();


router.get("/", (_req, res) => {
    const productosObtenidos = contenedor.getAll();
    res.send(productosObtenidos);
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    const producto = contenedor.getById(parseInt(id));
    res.send(producto)
});

router.post('/', (req, res) => {
    const obj = req.body;
    const newProduct = contenedor.create(obj);
    res.send(newProduct)
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    const updateProducto = contenedor.updateById(parseInt(id), obj);
    res.send(updateProducto);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const deletId = contenedor.deleteById(parseInt(id));
    res.send(this.deletId)
});


module.exports = router;
