const express = require("express");
const router = require("./router");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use("/api/productos", router);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

server.on('error', (error) =>{
    console.log(`Error en servidor ${error}`);
});
