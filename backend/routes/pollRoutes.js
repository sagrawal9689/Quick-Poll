import express from 'express'
const router = express.Router()
import {
  createPoll,
  getPoll
} from '../controllers/pollController.js'

router.route('/').post(createPoll)
router.route('/:id').get(getPoll)

export default router