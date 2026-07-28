import express from 'express'
import {
    registerUser,
    loginUser,
    profile,
} from '../controllers/authControllers.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', (req, res) => {
    console.log('Hiciste una petición POST - /logout')
    res.json({ message: 'Hiciste una petición POST - /logout' })
})

router.get('/profile', profile)

export default router
