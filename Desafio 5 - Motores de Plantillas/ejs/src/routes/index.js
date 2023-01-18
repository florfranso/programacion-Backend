import { Router } from "express";
import Contenedor from "../container/container.js";

const router = Router();
const container = new Contenedor("products.json");

router

    .get("/", (req, res) => {
        res.render("index.ejs");
    })

    .post("/productos", async (req, res) => {
        const { body } = req;
        const newProduct = await container.save(body);
        res.redirect("/");
    })

    .get('/productos', async (req, res) => {
        const products = await container.getAll();
        res.render("products.ejs", {products});
    });

export default router;