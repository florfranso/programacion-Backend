import express from 'express'
import { obtenerProductos, obtenerProdById, agregarProducto, editarProducto, eliminarProducto } from '../controllers/productosController.js'
import checkAuth from '../middware/checkAdmin.js'

const router = express.Router()

router.get('/', obtenerProductos)
router.get('/:id?', obtenerProdById)
router.post('/', checkAuth, agregarProducto)
router.put('/:id', checkAuth, editarProducto)
router.delete('/:id', checkAuth, eliminarProducto)

export default router;