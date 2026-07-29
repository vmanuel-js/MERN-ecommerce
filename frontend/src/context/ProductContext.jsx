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
    const [productsLoading, setProductsLoading] = useState([])
    const [product, setProduct] = useState({})
    const [productLoading, setProductLoading] = useState(true)
    const [error, setError] = useState(null)

    // Función para traer todos los productos
    // useCallback = No se vuelva a lanzar en los re-renderizados
    const getProducts = useCallback(async (id) => {
        setProductsLoading(true)
        setProduct({}) // Resetear el producto anterior

        try {
            const response = await axios.get(API_URL)
            console.log(response)
            setProducts(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener los productos')
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
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

// Hook personalizado
export const useProduct = () => useContext(ProductContext)
