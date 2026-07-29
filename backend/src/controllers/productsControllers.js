import { ZodError } from 'zod'
import ProductModel from '../models/ProductModel.js'
import { productSchema } from '../schemas/productSchema.js'

export const createProduct = async (req, res) => {
    try {
        // Traer las propiedades del objeto del Producto
        const { name, description, price, stock, imageUrl } =
            productSchema.parse(req.body)

        // Vamos a crear con el modelo de Producto
        const product = await ProductModel.create({
            name,
            description,
            price,
            stock,
            imageUrl,
        })

        // Retornar
        res.status(201).json({
            message: 'Producto creado exitosamente: ',
            product,
        })
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(404).json(
                error.issues.map((issue) => ({ message: issue.message }))
            )
        }

        return res.status(500).json({ message: 'Error al crear el producto' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        // Validar los datos de entrada con Zod
        const validateData = productSchema.partial().parse(req.body)

        // Buscar y actualizar el producto
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            validateData,
            { new: true, runValidators: true }
        )

        // Manejar el caso de que el producto no exista
        if (!updateProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        // Devolver el producto actualizado
        console.log(updatedProduct)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.json({ message: 'Error al actualizar el producto' })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)

        if (!product) {
            return res
                .status(404)
                .json({ message: 'No se encontró el producto con ese ID' })
        }

        return res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtner el producto' })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()

        if (!products) {
            return res
                .status(404)
                .json({ message: 'No se encontró el producto con ese ID' })
        }

        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtner el producto' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)

        if (!product) {
            return res
                .status(404)
                .json({ message: 'No se encontró un producto con ese ID' })
        }

        return res.status(200).json(product)
    } catch (error) {
        res.json({ message: 'Error al eliminar el producto' })
    }
}
