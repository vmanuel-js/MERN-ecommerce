import express from 'express'
import { connectDB, disconnectDB } from './config/configdb.js'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

const PORT = 3001

// Rutas API
app.use('/api/auth', authRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Servidor corriendo en puerto: http://localhost:${PORT}`
            )
        })
    })
    .catch(() => {
        disconnectDB()
    })
