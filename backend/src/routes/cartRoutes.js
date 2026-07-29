import express from 'express'
import {
    addToCart,
    getCart,
    updateCart,
    removeProductFromCart,
    clearCart,
    getCartTotal,
} from '../controllers/cartControllers.js'

const router = express.Router()

router.get('/get/:userId', getCart) // Obtener el carrito
router.get('/total/:userId', getCartTotal) // Obtener el total del carrito

router.put('/update/:userId', updateCart) // Actualizar el carrito
router.delete('/removeProduct/:userId', removeProductFromCart) // Quitar productos del carrito
router.delete('/clear/:userId', clearCart) // Limpiar el carrito

// Ruta para agregar al carrito (no necesita userId)
router.post('/add', addToCart) // Añadir carrito

export default router
