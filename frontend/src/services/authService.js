import axios from 'axios'

// Configuración base de axios para autenticación
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
// http://localhost:3001/api/auth/register
// http://localhost:3001/api/auth/profile
// http://localhost:3001/api/auth/login
// http://localhost:3001/api/auth/logout

// Para incluir la cookies en las peticiones
axios.defaults.withCredentials = true

export const loginService = async (data, reset, setRedirect, setUserInfo) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        // Si la respuesta es exitosa
        if (response.status === 200) {
            setUserInfo(response.data)
            reset()
            setRedirect(true)
            return {
                success: true,
                message: 'Inicio de sesión exitoso',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error al loguearse',
        }
    }
}

export const registerService = async (
    data,
    reset,
    setRedirect,
    checkSession,
) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        if (response.status === 201 || response.status === 200) {
            // Verificar la sesión real del servidor despues del registro
            await checkSession()
            reset()
            setRedirect(true)

            return {
                message: true,
            }
        }
    } catch (error) {
        return {
            message: false,
        }
    }
}

export const logoutService = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Error al cerrar la sesión',
        )
    }
}

export const getProfileService = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener el perfil')
    }
}
