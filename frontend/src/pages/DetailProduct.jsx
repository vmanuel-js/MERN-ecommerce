import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../context/ProductContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()
    const { addToCart, openModal } = useCart()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    const handleAddToCart = async () => {
        await addToCart(product)
        openModal()
    }

    return (
        <>
            {productLoading ? (
                <div className="loading loading-spinner"></div>
            ) : (
                <div className="mt-6 md:flex">
                    <div className="md:w-1/2">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <section className="flex flex-col gap-5 pt-2 md:pt-0 md:pl-4 md:w-1/2">
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p className="text-xl badge badge-warning p-4 font-bold">
                            PEN {product.price}
                        </p>
                        <p className="text-lg">{product.description}</p>
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-success mt-2 md:mt-auto md:btn-lg"
                        >
                            Agregar al carrito
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}
