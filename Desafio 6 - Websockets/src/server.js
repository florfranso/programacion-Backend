import express, { json, urlencoded } from "express";
import path, { dirname, join } from "path";
import { Server as IOServer } from "socket.io";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import Contenedor from "./container/container.js";
import * as fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const expressServer = app.listen(8080, () => {
    console.log("Server listening port 8080");
});
const io = new IOServer(expressServer);
const container = new Contenedor("products.json");
const containerMessages = new Contenedor("messages.json");

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: join(__dirname, "/public/index.hbs"),
        layoutsDir: join(__dirname, "/public"),
        partialsDir: join(__dirname, "/views/partials")
    }));

app.set("view engine", "hbs");
app.set("views", join(__dirname, "/views"));

io.on("connection", async (socket) => {
    console.log(`New connection! Socket ID: ${socket.id}`);

    const products = await container.getAll();
    socket.emit("server:product", products);

    const messages = await containerMessages.getAll();
    socket.emit("server:message", messages);

    socket.on("client:product", async (productInfo) => {
        await container.save(productInfo);
        const products = await container.getAll();
        io.emit("server:product", products);
    });

    socket.on("client:message", async(messageInfo) => {
        await containerMessages.save(messageInfo);
        const messages = await containerMessages.getAll();

        async function saveMessages() {
            try {
                await fs.promises.writeFile('./messages.json', JSON.stringify(messages, null, 2));
            } catch (error) {
                throw new Error(`Error al guardar el mensaje en el archivo: ${error}`);
            }
        };
        saveMessages();

        io.emit("server:message", messages);
    });
});

app.get("/", async (req, res) => {
    res.render(join(__dirname, "/views/partials/products.hbs"))
});

app.on("error", (error) => {
    console.log(error);
});