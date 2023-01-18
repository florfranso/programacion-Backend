const express = require("express");
const Contenedor = require("./manejoArchivos");


const app = express();
const PORT = 8080;

const contenedor = new Contenedor("productos.txt");

app.get("/productos", async (req, res) => {
    const productos = await contenedor.getAll();
    res.send({Productos: productos});
})

app.get('/productoRandom', async (req, res) => {
    const productos = await contenedor.getAll();
    let numeroRandom = parseInt(Math.random() * productos.length);
    res.send({Productos: productos[numeroRandom]});
}) 

const server = app.listen(PORT, () => {
    console.log(`Server listening: PORT ${PORT}`);
})

server.on('error', error => console.log(`Error en servidor ${error}`))
