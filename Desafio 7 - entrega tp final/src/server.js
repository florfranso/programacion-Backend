import express from 'express'
import productosRouter from './routes/productos.route.js'
import carritoRouter from './routes/carrito.route.js'

const app = express()
app.use(express.json())

app.use("/api/productos", (productosRouter))
app.use("/api/carrito", (carritoRouter))

app.listen(8080, () => {
    console.log('Server is running on port 8080')
});

export default app