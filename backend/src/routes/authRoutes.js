import express from 'express'

const router = express.Router()

router.post('/register', (req, res) => {
    console.log('Hiciste una petición POST - /register')
    res.json({ message: 'Hiciste una petición POST - /register' })
})

router.post('/login', (req, res) => {
    console.log('Hiciste una petición POST - /login')
    res.json({ message: 'Hiciste una petición POST - /login' })
})

router.post('/logout', (req, res) => {
    console.log('Hiciste una petición POST - /logout')
    res.json({ message: 'Hiciste una petición POST - /logout' })
})

router.get('/profile', (req, res) => {
    console.log('Hiciste una petición GET - /profile')
    res.json({ message: 'Hiciste una petición GET - /profile' })
})

export default router
