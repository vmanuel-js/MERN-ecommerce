import Cart from './Cart.jsx'
import AuthButtons from './AuthButtons.jsx'
import UserDropdown from './UserDropdown.jsx'

const Navbar = () => {
    return (
        <header>
            <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl" to="/">
                        Ecommerce
                    </a>
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
