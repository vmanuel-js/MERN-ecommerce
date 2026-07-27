import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext.jsx'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerService } from '../../services/authService.js'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange',
    })

    const { userInfo, checkSession } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const onSubmit = async (data) => {
        const result = await registerService(
            data,
            reset,
            setRedirect,
            checkSession,
        )
        if (result.message) {
            toast.success('Registro exitoso')
        } else {
            toast.error('Error, intente más tarde')
        }
    }

    if (redirect && userInfo.isAdmin) {
    }

    if (redirect && !userInfo.isAdmin) {
        return <Navigate to={'/'} />
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-125 mx-auto"
        >
            <div>
                <input
                    {...register('username', {
                        required: 'El nombre del usuario es requerido',
                        minLength: {
                            value: 3,
                            message: 'Mínimo 3 caracteres',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Máximo de 20 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${errors.username ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    autoComplete="usernames"
                />
                {errors.username && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.username.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('email', {
                        required: 'El correo electrónico es requerido',
                        pattern: {
                            value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
                            message: 'Correo electrónico inválido',
                        },
                        minLength: {
                            value: 6,
                            message: 'Minimo 6 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message: 'Máximo 254 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${errors.email ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type="email"
                    placeholder="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="relative">
                <input
                    {...register('password', {
                        required:
                            'La contraseña es requerida [6-254 caracteres de longitud]',
                        minLength: {
                            value: 6,
                            message: 'Minimo 6 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message: 'Máximo 254 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${errors.password ? 'border-red-500 outline-red-500 focus:outline-red-500' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    autoComplete="current-password"
                />
                <button
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                        showPassword
                            ? 'Ocultar contraseña'
                            : 'Mostrar contraseña'
                    }
                    type="button"
                    className="cursor-pointer absolute right-4 top-5 transform -translate-y-1/2 text-gray-600"
                >
                    {showPassword ? (
                        <FaEyeSlash size={23} />
                    ) : (
                        <FaEye size={23} />
                    )}
                </button>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <button className="btn btn-primary" type="submit">
                Registrarse
            </button>
        </form>
    )
}

export default RegisterForm
