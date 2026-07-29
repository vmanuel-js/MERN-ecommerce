import { useContext, createContext, useState, useEffect } from 'react'
import { getProfileService } from '../services/authService.js'
export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)

    const checkSession = async () => {
        try {
            setLoading(true)
            const userData = await getProfileService()
            setUserInfo(userData)
        } catch (error) {
            setUserInfo({})
        } finally {
            setLoading(false)
        }
    }

    // Funcion para obtener el id del usuario autenticado
    const getUserId = () => {
        return userInfo?.id || null
    }

    // Funcion para saber si el usuario esta autenticado o no
    const isAuthenticated = () => {
        return !!userInfo?.id
    }

    useEffect(() => {
        checkSession()
    }, [])

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                loading,
                checkSession,
                getUserId,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
