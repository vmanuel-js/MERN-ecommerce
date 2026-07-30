import { CreateProductForm } from '../components/AdminDashboard/CreateProductForm/CreateProductForm.jsx'

// importar el componente del formulario
export const CreateProduct = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">
                Crear Producto
            </h1>
            <CreateProductForm />
        </div>
    )
}
