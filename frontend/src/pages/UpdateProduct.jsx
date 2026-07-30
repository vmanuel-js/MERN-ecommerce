import { UpdateProductForm } from '../components/AdminDashboard/UpdateProductForm/UpdateProductForm.jsx'
import { useParams } from 'react-router-dom'
import { useProduct } from '../context/ProductContext.jsx'
import { useEffect } from 'react'

export const UpdateProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">
                Actualizar Producto
            </h1>
            {productLoading ? (
                <div className="loading loading-spinner"></div>
            ) : (
                <UpdateProductForm product={product} />
            )}
        </div>
    )
}
