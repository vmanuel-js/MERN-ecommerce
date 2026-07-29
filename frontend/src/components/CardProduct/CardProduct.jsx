import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext.jsx'
import { FaShoppingCart } from 'react-icons/fa'

export const CardProduct = ({
    product: { _id, name, price, imageUrl, description, stock },
}) => {
    const { isAuthenticated } = useUser()
    return (
        <div className="card bg-base-100 w-80 lg:w-[30%] mt-4 shadow-lg">
            <figure>
                <img
                    className="aspect-9/9 object-cover"
                    src={imageUrl}
                    alt={name}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="badge badge-warning font-bold">PEN {price}</div>
                <p>{description}</p>
                <div className="card-actions justify-between mt-4">
                    <Link
                        to={`/detailProduct/${_id}`}
                        className="btn btn-info btn-sm md:btn-md"
                    >
                        Ver detalles
                    </Link>
                    <button
                        disabled={stock === 0}
                        className="btn btn-success btn-sm md:btn-md"
                    >
                        <FaShoppingCart size={16} />
                        {stock === 0 ? 'Sin Stock' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
