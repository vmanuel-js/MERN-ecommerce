import { CardProduct } from '../components/CardProduct/CardProduct.jsx'
import { useProduct } from '../context/ProductContext.jsx'

const Home = () => {
    const { products, productsLoading, error } = useProduct()

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-7 mb-2 text-yellow-300 uppercase">
                Productos de la tienda
            </h1>
            <p className="text-center mb-4">Elige tu comida ⬇️</p>
            <div className="flex flex-wrap gap-5 justify-center">
                {productsLoading ? (
                    <div className="loading loading-spinner"></div>
                ) : error ? (
                    <p>Error al cargar los productos</p>
                ) : (
                    products.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Home
