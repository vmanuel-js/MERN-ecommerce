import { CgTrash } from 'react-icons/cg'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '../../context/CartContext.jsx'
import { useUser } from '../../context/UserContext.jsx'
import { Link } from 'react-router-dom'

export const ModalCart = () => {
    const {
        cart,
        closeModal,
        isModalOpen,
        itemsQuantity,
        total,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
    } = useCart()

    if (!isModalOpen) return null // Solo renderizará si el modal está abierto

    return (
        <div className="modal modal-open px-4">
            <h1>Modal</h1>
        </div>
    )
}
