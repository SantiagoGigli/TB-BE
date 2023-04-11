import express from 'express'
import { getFilesParsed, getOriginalList } from '../controllers/index.js'

const router = express.Router()

router.get('/data', getFilesParsed)
router.get('/list', getOriginalList)

export default router
