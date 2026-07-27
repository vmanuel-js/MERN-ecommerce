import bcrypt from 'bcryptjs'
import jwt, { decode } from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
import { registerSchema } from '../schemas/authSchema.js'

export const registerUser = async (req, res) => {
    try {
        // Traer la clave secreta de JWT
        const JWT_SECRET = process.env.JWT_SECRET

        // Extraer los datos del usuario
        const { username, email, password } = registerSchema.parse(req.body)

        // Comprobar si ya existe el usuario
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            res.status(400).json({ message: 'El usuario ya existe' })
        }

        // Encriptar la constraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Comprobar el usuario Administrador
        const isFirstUser = (await UserModel.countDocuments()) === 0

        // Crear el usuario y guardar en al BD
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: isFirstUser,
        })

        // Generar token con JWT
        // Payload
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
            expiresIn: '1h',
        })

        // Enviar el token como una cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000,
        })
            .status(201)
            .json({ message: 'Usuario registrado con éxito' })
    } catch (error) {
        res.json(error)
    }
}

export const profile = async (req, res) => {
    // Extraer el accessToken enviado por el cliente
    const token = req.cookies.accessToken

    try {
        // Verificar o decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Buscar el usuario en la BD
        const user = await UserModel.findById(decoded.userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        console.log(
            'USUARIO ENCONTRADO CON EXITO y enviado al front datos del usuario'
        )
        res.status(200).json({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } catch (error) {
        res.status(401).json({ message: 'No autorizado' })
    }
    return {
        user: 'test user',
    }
}
