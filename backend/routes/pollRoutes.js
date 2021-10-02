import express from 'express'
const router = express.Router()
import {
  createPoll
} from '../controllers/pollController.js'

router.route('/').post(createPoll)

export default router