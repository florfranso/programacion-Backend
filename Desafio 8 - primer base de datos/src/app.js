/* Importacion de librerias internas y externas */
const express = require("express");
const app = express();
const PORT = 8080;

/* Socket / Http */
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

/* SQL */
const options = require("./controllers/options");
const knex = require("knex");
const connectionMySql = knex(options.mysql);
const connectionSqlite3 = knex(options.sqlite3);
const bp = require("body-parser");
const routers = require("./public/routers");
const handlebars = require("express-handlebars");

const moment = require("moment/moment");
const Contenedor = require("./controllers/SQLController.js");
const productos = new Contenedor(connectionMySql, "products");
const messages = new Contenedor(connectionSqlite3, "messages");

/* middlewares incorporados */
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views",
    })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.use("/", routers);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("bienvenidos", {
        style: "bienvenidos.css",
        title: "Bienvenido",
    });
});

const connectionFunctions = require("./controllers/connection.js");
const { time } = require("console");

/* Creo tablas de productos y mensajes */
connectionFunctions.mysqlFunc();
connectionFunctions.sqlite3Func();

app.post("/", async (req, res) => {
    console.log(`post req recibida con exito`);
    const data = req.body;
    console.log(data);

    if (!data) {
        res.status(204).json(notFound);
    }

    await productos.save(data);
    const arrayProductos = await productos.getAll();

    res.status(201).render("formulario", {
        productos: arrayProductos,
        style: "formulario.css",
        title: "Productos con Handlebars",
    });
});

server.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));

io.on("connection", async socket => {
    console.log("Nuevo cliente conectado");

    try {
        /* cargar los productos */
    const listaProductos = await productos.getAll();
    socket.emit("new-connection", listaProductos);
    socket.on("new-product", data => {
        productos.save(data);
        io.sockets.emit("producto", data);
    });

    /* cargar todos los mensajes a la primera conexion */
    const listaMensajes = await messages.getAll();
    socket.emit("messages", listaMensajes);
    //socket.emit("messages", messages);

    socket.on("new-message", async data => {
        data.time = moment(new Date()).format("DD/MM/YYYY hh:mm:ss");
        await messages.save(data);
        io.sockets.emit("messages", messages);
    });
        socket.on("disconnect", () => {
        console.log("cliente desconectado");
        });

    } catch(error) {
        console.log(`Ocurrio un error! ${error.message}`);
    }
});
