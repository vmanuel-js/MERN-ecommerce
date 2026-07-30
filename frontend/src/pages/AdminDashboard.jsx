import { Routes, Route } from 'react-router-dom'
import { TableProductDashboard } from '../components/AdminDashboard/TableProductDashboard/TableProductDashboard.jsx'
import { DashboardLayout } from '../layouts/DashboardLayout.jsx'
import { CreateProduct } from './CreateProduct.jsx'
import { UpdateProduct } from './UpdateProduct.jsx'

export const AdminDashboard = () => {
    return (
        <section>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route index element={<TableProductDashboard />} />
                    <Route
                        path="/products"
                        element={<TableProductDashboard />}
                    />
                    <Route
                        path="/products/createProduct"
                        element={<CreateProduct />}
                    />
                    <Route
                        path="/products/updateProduct/:id"
                        element={<UpdateProduct />}
                    />
                </Route>
            </Routes>
        </section>
    )
}
