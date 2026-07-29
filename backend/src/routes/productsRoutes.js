import express from 'express'
import {
    createProduct,
    updateProduct,
    getProductById,
    getAllProducts,
    deleteProduct,
} from '../controllers/productsControllers.js'

const router = express.Router()

// Rutas públicas
router.get('/', getAllProducts) // Todos los productos
router.get('/:id', getProductById) // Detalle del producto

// Rutas protegidas donde los admin pueden modificar los productos
router.post('/', createProduct) // Crear Producto
router.put('/:id', updateProduct) // Actualizar Producto
router.delete('/:id', deleteProduct) // Eliminar Producto

export default router
