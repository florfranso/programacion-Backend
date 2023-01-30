const { Router } = require("express");
const router = Router();
const options = require("../../controllers/options.js");
const knex = require("knex");
const connectionMySql = knex(options.mysql);
const connectionSqlite3 = knex(options.sqlite3);
const Contenedor = require("../../controllers/SQLcontroller.js");
const productos = new Contenedor(connectionMySql, "products");
const messages = new Contenedor(connectionSqlite3, "messages");
const notFound = { error: "Producto no encontrado" };


router.get("/", async (req, res) => {
    const arrayProductos = await productos.getAll();
    res.render("formulario", {
        productos: arrayProductos,
        style: "formulario.css",
        title: "Productos con Handlebars",
    });
});

router.post("/", async (req, res) => {
    const data = req.body;
    await productos.save(data);
    res.status(201);
});

module.exports = router;