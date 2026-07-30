import { Link } from 'react-router-dom'
import { useProduct } from '../../../context/ProductContext.jsx'
import toast from 'react-hot-toast'

export const TableProducts = ({ products }) => {
    const { deleteProduct } = useProduct()

    const onHandleDelete = async (id) => {
        const result = await deleteProduct(id)

        if (result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    return (
        <table className="table text-center">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={`${product._id}-${index}`}>
                        <th>{index + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.imageUrl}</td>
                        <td>
                            <Link
                                className="btn btn-info"
                                to={`/admin/dashboard/products/updateProduct/${product._id}`}
                            >
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button
                                className="btn btn-error"
                                onClick={() => onHandleDelete(product._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
