import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createOrder } from '../services/orderService.js'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const Checkout = () => {
    const { cart, total, clearCart, loading: cartLoading } = useCart()
    const { user } = useUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: user?.email || '',
            phone: '',
            street: '',
            number: '',
            city: '',
            state: '',
            zipCode: '',
        },
        mode: 'onChange',
    })

    if (cartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-lg">Cargando carrito....</p>
                </div>
            </div>
        )
    }

    const onSubmit = async (data) => {
        setLoading(true)

        try {
            // Preparar los datos para el backend
            const orderData = {
                items: cart.map((item) => ({
                    id: item._id,
                    title: item.name,
                    quantity: item.quantity || 1,
                    unit_price: item.price,
                    currency_id: 'ARS',
                })),
                payer: {
                    email: data.email,
                },
                shippingInfo: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: {
                        street: data.street,
                        number: data.number,
                        city: data.city,
                        state: data.state,
                        zipCode: data.zipCode,
                    },
                },
            }

            const response = await createOrder(orderData)

            if (response.success && response.paymentUrl) {
                // Mostrar mensaje de éxito
                toast.success(
                    'Orden creada con éxito. Redirigiendo a Mercado Pago...',
                )

                // Guardar el carrito en sessionStorage como respaldo
                sessionStorage.setItem('checkoutCart', JSON.stringify(cart))

                // Limpiar la URL de posibles espacios en blanco
                const cleanUrl = response.paymentUrl.trim()

                // Redirigir a Mercado Pago después de un breve delay
                setTimeout(() => {
                    window.location.href = cleanUrl
                }, 1500)
            } else {
                throw new Error('No se recibió URL de pago')
            }
        } catch (error) {
            toast.error('Error al procesar la orden intente más tarde')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Formulario de envío */}
                <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">
                        Información de Envío
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 lg:gap-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <input
                                    {...register('firstName', {
                                        required: 'El nombre es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                        errors.firstName
                                            ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                            : ''
                                    }`}
                                    type="text"
                                    placeholder="Nombre *"
                                    autoComplete="given-name"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-2 ml-1">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    {...register('lastName', {
                                        required: 'El apellido es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                        errors.lastName
                                            ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                            : ''
                                    }`}
                                    type="text"
                                    placeholder="Apellido *"
                                    autoComplete="family-name"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-2 ml-1">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <input
                                {...register('email', {
                                    required: 'El email es requerido',
                                    pattern: {
                                        value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
                                        message: 'Email inválido',
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Mínimo 6 caracteres',
                                    },
                                    maxLength: {
                                        value: 254,
                                        message: 'Máximo 254 caracteres',
                                    },
                                })}
                                className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                    errors.email
                                        ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                        : ''
                                }`}
                                type="email"
                                placeholder="Email *"
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2 ml-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register('phone', {
                                    required: 'El teléfono es requerido',
                                    pattern: {
                                        value: /^[0-9+\-\s()]+$/,
                                        message: 'Formato de teléfono inválido',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Mínimo 8 dígitos',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Máximo 20 caracteres',
                                    },
                                })}
                                className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                    errors.phone
                                        ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                        : ''
                                }`}
                                type="tel"
                                placeholder="Teléfono * (Ej: 1123456789)"
                                autoComplete="tel"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-2 ml-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                            <div className="md:col-span-2">
                                <input
                                    {...register('street', {
                                        required: 'La calle es requerida',
                                        minLength: {
                                            value: 3,
                                            message: 'Mínimo 3 caracteres',
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'Máximo 100 caracteres',
                                        },
                                    })}
                                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                        errors.street
                                            ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                            : ''
                                    }`}
                                    type="text"
                                    placeholder="Calle *"
                                    autoComplete="address-line1"
                                />
                                {errors.street && (
                                    <p className="text-red-500 text-sm mt-2 ml-1">
                                        {errors.street.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    {...register('number', {
                                        required: 'El número es requerido',
                                        pattern: {
                                            value: /^[0-9a-zA-Z\s\-\/]+$/,
                                            message:
                                                'Formato de número inválido',
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Máximo 10 caracteres',
                                        },
                                    })}
                                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                        errors.number
                                            ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                            : ''
                                    }`}
                                    type="text"
                                    placeholder="Número *"
                                    autoComplete="address-line2"
                                />
                                {errors.number && (
                                    <p className="text-red-500 text-sm mt-2 ml-1">
                                        {errors.number.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <input
                                    {...register('city', {
                                        required: 'La ciudad es requerida',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                        errors.city
                                            ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                            : ''
                                    }`}
                                    type="text"
                                    placeholder="Ciudad *"
                                    autoComplete="address-level2"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-2 ml-1">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    {...register('state', {
                                        required: 'La provincia es requerida',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                        errors.state
                                            ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                            : ''
                                    }`}
                                    type="text"
                                    placeholder="Provincia *"
                                    autoComplete="address-level1"
                                />
                                {errors.state && (
                                    <p className="text-red-500 text-sm mt-2 ml-1">
                                        {errors.state.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <input
                                {...register('zipCode', {
                                    required: 'El código postal es requerido',
                                    pattern: {
                                        value: /^[0-9A-Za-z\s\-]+$/,
                                        message:
                                            'Formato de código postal inválido',
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Mínimo 3 caracteres',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Máximo 10 caracteres',
                                    },
                                })}
                                className={`p-2 outline-2 border rounded focus:outline-primary w-full ${
                                    errors.zipCode
                                        ? 'border-red-400 outline-red-400 focus:outline-red-400'
                                        : ''
                                }`}
                                type="text"
                                placeholder="Código Postal *"
                                autoComplete="postal-code"
                            />
                            {errors.zipCode && (
                                <p className="text-red-500 text-sm mt-2 ml-1">
                                    {errors.zipCode.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-6"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Procesando...
                                </>
                            ) : (
                                'Proceder al Pago'
                            )}
                        </button>
                    </form>
                </div>

                {/* Resumen de la orden */}
                <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">
                        Resumen de la Orden
                    </h2>

                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Cantidad: {item.quantity || 1}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-semibold">
                                    S/ {item.price * (item.quantity || 1)}
                                </span>
                            </div>
                        ))}

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Total:</span>
                                <span>S/ {total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
