import { Navigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext.jsx'

export const ProtectedRoute = ({ children }) => {
    const { userInfo, loading } = useUser()

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (Object.keys(userInfo).length === 0) {
        return <Navigate to="/" replace />
    }

    if (!userInfo.isAdmin) {
        return <Navigate to="/" replace />
    }

    return children
}
