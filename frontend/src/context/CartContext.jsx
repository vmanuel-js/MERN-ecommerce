import { createContext, useState, useEffect, useContext } from 'react'
import { useUser } from './UserContext.jsx'
import {
    addToCartService,
    getCartService,
    updateCartService,
    removeFromCartService,
    getCartTotalService,
    clearCartService,
} from '../services/cartService.js'
import toast from 'react-hot-toast'

export const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [itemsQuantity, setItemsQuantity] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const { getUserId, isAuthenticated } = useUser()

    // Función para cargar el carrito desde el LocalStorage
    const loadLocalCart = () => {
        try {
            const localCart = localStorage.getItem('cart')
            return localCart ? JSON.parse(localCart) : []
        } catch (error) {
            console.error('Error al cargar el carrito local: ', error)
            return []
        }
    }

    // Función para guardar el carrito en el LocalStorage
    const saveLocalCart = (cartItems) => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        } catch (error) {
            console.error('Error al guardar el carrito local: ', error)
        }
    }

    // Función para cargar el carrito en el backend o loadCart

    const loadCart = async () => {
        if (isAuthenticated()) {
            // Usuario autenticado: cargar desde el backend
            try {
                setLoading(true)
                const userId = getUserId()
                const response = await getCartService(userId)

                // Transformar los datos del backend al formato del frontend
                const cartItems = response.cart?.products?.map(
                    (product) =>
                        ({
                            _id: product.productId._id,
                            name: product.productId.name,
                            price: product.productId.price,
                            description: product.productId.description,
                            stock: product.productId.stock,
                            quantity: product.productId.quantity,
                        }) || [],
                )

                setCart(cartItems)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        } else {
            // Usuario no autenticado: cargar desde el localStorage
            const localCart = loadLocalCart()
            setCart(localCart)
            setLoading(false)
        }
    }

    // Función para sincronizar carrito con el backend
    const syncCartWithBackend = async () => {
        const localCart = loadLocalCart()

        if (localCart.length > 0 && isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()

                // Agregar cada producto del carrito local al backend
                for (const item of localCart) {
                    try {
                        await addToCartService(userId, item._id, item.quantity)
                    } catch (error) {
                        console.error(
                            `Error al sincronizar producto ${item.name}`,
                        )
                    }
                }

                // Limpiar el localStorage despues de sincronizar
                localStorage.removeItem('cart')

                // Recargar carrito desde el backend
                await loadCart()
                toast.success('Carrito sincronizado con éxito')
            } catch (error) {
                console.error('Error al sincronizar el carrito ', error)
            } finally {
                setLoading(false)
            }
        }
    }

    // Cargar carrito al inicializar
    useEffect(() => {
        let isMounted = true
        const initializeCart = async () => {
            // Esperar un poco para que el UserContext se estabilice
            await new Promise((resolve) => setTimeout(resolve, 100))

            if (!isMounted) return

            const previousAuthState = localStorage.getItem('wasAuthenticated')
            const currentAuthState = isAuthenticated()

            if (!previousAuthState && currentAuthState) {
                // Usuario acaba de iniciar sesión: sincronizar el carrito local
                await syncCartWithBackend()
            } else {
                // cargar el carrito normalmente
                await loadCart()
            }

            // Guardar estado de autenticación actual
            localStorage.setItem(
                'wasAuthenticated',
                currentAuthState.toString(),
            )

            setLoading(false)
        }

        initializeCart()

        return () => {
            isMounted = false
        }
    }, [])

    // Añadir producto al carrito
    const addToCart = async (product, quantity = 1) => {
        if (isAuthenticated) {
            // Usuario autenticado debemos usar el backend
            try {
                setLoading(true)
                const userId = getUserId()
                await addToCartService(userId, product._id, quantity)

                // Recargar el carrito después de agregar
                await loadCart()
                toast.success('Producto agregado al carrito')
            } catch (error) {
                console.error('Error al agregar producto al carrito', error)
                toast.error('Error al agregar producto al carrito')
            } finally {
                setLoading(false)
            }
        } else {
            // Usuario no autenticado: usar LocalStorage
            try {
                const currentCart = [...cart]
                const existingIndex = currentCart.findIndex(
                    (item) => item._id === product._id,
                )

                if (existingIndex > -1) {
                    // Producto ya existe, actualizar cantidad
                    currentCart[existingIndex].quantity += quantity
                } else {
                    // Nuevo Producto : agregar
                    currentCart.push({ ...product, quantity })
                    setCart(currentCart)
                    saveLocalCart(currentCart)
                    toast.success('Producto agregado al carrito')
                }
            } catch (error) {
                console.error('Error al agregar al carrito local: ', error)
                toast.error('Error al agregar producto al carrito')
            }
        }
    }

    // Eliminar producto del carrito
    const removeFromCart = async (productId) => {
        if (isAuthenticated) {
            try {
                setLoading(true)
                const userId = getUserId()
                await removeFromCart(userId, productId)

                // Recargar el carrito después de eliminar
                await loadCart()
                toast.success('Producto eliminado del carrito')
            } catch (error) {
                console.error('Error al eliminar producto del carrito: ', error)
                toast.error('Error al eliminar producto del carrito')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const currentCart = cart.filter(
                    (item) => item._id !== productId,
                )
                setCart(currentCart)
                saveLocalCart(currentCart)
                toast.success('Producto eliminado del carrito')
            } catch (error) {
                console.error(
                    'Error al eliminar producto del carrito local: ',
                    error,
                )
                toast.error('Error al eliminar producto del carrito local')
            }
        }
    }

    // Función para actualizar cantidad del producto
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error('La cantidad debe ser al menos 1')
            return
        }

        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await updateCartService(userId, productId, newQuantity)

                // Recargar el carrito después de actualizar
                await loadCart()
                toast.success('Cantidad actualizada')
            } catch (error) {
                console.error(
                    'Error al actualizar la cantidad del producto del carrito: ',
                    error,
                )
                toast.error(
                    'Error al actualizar la cantidad del producto del carrito',
                )
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const currentCart = cart.map((item) =>
                    item._id === productId
                        ? { ...item, quantity: newQuantity }
                        : item,
                )
                setCart(currentCart)
                saveLocalCart(currentCart)
                toast.success('Cantidad actualizada')
            } catch (error) {
                console.error('Error al actualizar la cantidad local: ', error)
                toast.error('Error al actualizar la cantidad local')
            }
        }
    }

    // Función para limpiar el carrito
    const clearCart = async () => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await clearCartService(userId)

                // Limpiar el estado local
                setCart([])
                toast.success('Carrito vacío')
            } catch (error) {
                console.error('Error al vaciar el carrito: ', error)
                toast.error('Error al vaciar el carrito')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setCart([])
                saveLocalCart([])
                toast.success('Carrito vacío')
            } catch (error) {
                console.error('Error al vaciar el carrito local: ', error)
                toast.error('Error al vaciar el carrito local')
            }
        }
    }

    // Escuchar cambios de autenticación por separado
    useEffect(() => {
        const previousAuthState =
            localStorage.getItem('wasAuthenticated') === true
        const currentAuthState = isAuthenticated()

        // Solo actuar si realmente cambió el estado de autenticación
        if (previousAuthState !== currentAuthState && cart.length === 0) {
            loadCart()
            localStorage.setItem(
                'wasAuthenticated',
                currentAuthState.toString(),
            )
        }
    }, [])

    // Calcular el total y cantidad de items cuando cambia el carrito
    useEffect(() => {
        const newTotal = cart.reduce(
            (acc, item) => acc + item.price * (item.quantity || 1),
            0,
        )

        setTotal(newTotal)

        const newItemsQuantity = cart.reduce(
            (acc, item) => acc + (item.quantity || 1),
            0,
        )

        setItemsQuantity(newItemsQuantity)
    }, [cart])

    // Función para abrir el modal
    const openModal = () => setIsModalOpen(true)
    // Cerrar el modal
    const closeModal = () => setIsModalOpen(false)

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                itemsQuantity,
                isModalOpen,
                loading,
                addToCart,
                removeFromCart,
                clearCart,
                openModal,
                closeModal,
                updateQuantity,
                loadCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
