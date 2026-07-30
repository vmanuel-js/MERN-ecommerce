import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'
import { CartContextProvider } from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import { DetailProduct } from './pages/DetailProduct.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.jsx'
import Checkout from './pages/Checkout.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFailure from './pages/PaymentFailure.jsx'
import PaymentPending from './pages/PaymentPending.jsx'

function App() {
    return (
        <UserContextProvider>
            <ProductContextProvider>
                <CartContextProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/detailProduct/:id"
                                element={<DetailProduct />}
                            />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route
                                path="/payment/success"
                                element={<PaymentSuccess />}
                            />
                            <Route
                                path="/payment/failure"
                                element={<PaymentFailure />}
                            />
                            <Route
                                path="/payment/pending"
                                element={<PaymentPending />}
                            />
                            <Route
                                path="/admin/dashboard/*"
                                element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </CartContextProvider>
            </ProductContextProvider>
            <Toaster />
        </UserContextProvider>
    )
}

export default App
