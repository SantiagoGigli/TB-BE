import express from 'express'
import data from './data.js'

const router = express.Router()

router.use('/files', data)

export default router
