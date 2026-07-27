import { Link } from 'react-router-dom'
const AuthButtons = () => {
    return (
        <div className="py-4 flex justify-center items-center gap-4 flex-wrap">
            <Link className="btn btn-neutral btn-outline" to={'/register'}>
                Crear Cuenta
            </Link>
            <Link className="btn btn-neutral btn-outline" to={'/login'}>
                Iniciar Sesión
            </Link>
        </div>
    )
}

export default AuthButtons
