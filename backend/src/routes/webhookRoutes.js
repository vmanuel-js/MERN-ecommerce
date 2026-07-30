import express from 'express'
import webhookController from '../controllers/webhookControllers.js'

const router = express.Router()

router.post('/', webhookController)

export default router
