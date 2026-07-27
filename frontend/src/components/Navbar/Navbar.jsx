import Cart from './Cart.jsx'
import AuthButtons from './AuthButtons.jsx'
import UserDropdown from './UserDropdown.jsx'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full">
                <div className="navbar-start">
                    <Link className="btn btn-ghost text-xl" to="/">
                        Ecommerce
                    </Link>
                </div>
                <div className="navbar-end gap-3">
                    <a className="btn btn-primary">Dashboard</a>
                    <AuthButtons />
                    <Cart />
                    <UserDropdown />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
