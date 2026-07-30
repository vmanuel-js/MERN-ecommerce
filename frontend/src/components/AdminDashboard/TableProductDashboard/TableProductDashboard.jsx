import { Link } from 'react-router-dom'
import { useProduct } from '../../../context/ProductContext.jsx'
import { TableProducts } from './TableProducts.jsx'

export const TableProductDashboard = () => {
    const { products, productsLoading } = useProduct()

    return (
        <>
            <div className="flex items-center gap-4 justify-center">
                <h1>Admin Products</h1>
                <Link
                    to={'/admin/dashboard/products/createProduct'}
                    className="btn btn-primary"
                >
                    Crear Producto
                </Link>
            </div>
            <div className="overflow-x-auto">
                {productsLoading ? (
                    <div className="loading loading-spinner"></div>
                ) : (
                    <div>
                        <TableProducts products={products} />
                    </div>
                )}
            </div>
        </>
    )
}
