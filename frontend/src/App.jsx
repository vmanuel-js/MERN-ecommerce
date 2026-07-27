import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
            <Toaster />
        </UserContextProvider>
    )
}

export default App
