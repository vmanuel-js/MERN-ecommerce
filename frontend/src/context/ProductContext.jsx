import {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true // Mandar cookies al backend
const API_URL = import.meta.env.VITE_BACKEND_URL + '/products'

export const ProductContext = createContext({})

export const ProductContextProvider = ({ children }) => {
    // Estados
    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [productLoading, setProductLoading] = useState(true)
    const [error, setError] = useState(null)

    // Función para traer todos los productos
    // useCallback = No se vuelva a lanzar en los re-renderizados
    const getProducts = useCallback(async () => {
        try {
            const response = await axios.get(API_URL)
            setProducts(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener los productos')
        } finally {
            setProductsLoading(false)
        }
    }, [])

    // Función para obtener un producto por Id
    const getProductById = useCallback(async (id) => {
        setProductLoading(true)
        setProduct({})
        try {
            const response = await axios.get(`${API_URL}/${id}`)
            setProduct(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener el producto')
        } finally {
            setProductLoading(false)
        }
    }, [])

    // Funcion para actualizar un producto
    const updateProduct = useCallback(async (id, data) => {
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
        }
        try {
            const response = await axios.put(API_URL + `/${id}`, cleanData, {
                withCredentials: true,
            })

            if (response.status === 200) {
                // Actualizar el producto individual
                setProduct(response.data)
                // Actualizar el producto en la lista de productos
                setProducts((prevProducts) =>
                    prevProducts.map((p) => (p._id === id ? response.data : p)),
                )

                return {
                    success: true,
                    message: 'Producto actualizado correctamente',
                }
            }
        } catch (error) {
            setError(error.message || 'Error al actualizar el producto')
            return {
                success: false,
                message: 'Error al actualizar el producto',
            }
        } finally {
            setProductLoading(false)
            setProductsLoading(false)
        }
    }, [])

    // Función para crear un producto
    const createProduct = useCallback(async (data) => {
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
        }

        try {
            const response = await axios.post(API_URL, cleanData, {
                withCredentials: true,
            })

            if (response.status === 201) {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    response.data.product,
                ])

                return {
                    success: true,
                    message: response.data.message,
                }
            }
        } catch (error) {
            setError(error.message || 'Error al crear el producto')
            return {
                success: false,
                message: error.message || 'Error al crear el producto',
            }
        } finally {
            setProductLoading(false)
        }
    }, [])

    const deleteProduct = useCallback(async (id) => {
        try {
            const response = await axios.delete(API_URL + `/${id}`, {
                withCredentials: true,
            })

            if (response.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.filter((p) => p._id !== id),
                )

                return {
                    success: true,
                    message: 'Producto eliminado correctamente',
                }
            }
        } catch (error) {
            setError(error.message || 'Error al eliminar el prducto')
            return {
                success: false,
                message: 'Error al eliminar el producto',
            }
        } finally {
            setProductsLoading(false)
        }
    }, [])

    // Usaremos useEffect ya que cada que alguien entre lo primero que
    // suceda al que cargue la app, los productos carguen y se muestren en la página
    useEffect(() => {
        getProducts()
    }, [getProducts])

    const value = {
        products,
        product,
        productsLoading,
        productLoading,
        error,
        getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

// Hook personalizado
export const useProduct = () => useContext(ProductContext)
