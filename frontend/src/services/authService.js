import axios from 'axios'

// Configuración base de axios para autenticación
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
// http://localhost:3001/api/auth/register

// Para incluir la cookies en las peticiones
axios.defaults.withCredentials = true

export const loginService = async () => {}

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

export const logoutService = async () => {}

export const getProfileService = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el perfil')
    }
}
