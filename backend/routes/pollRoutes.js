import express from 'express'
const router = express.Router()
import {
  createPoll,
  getPoll,
  increaseCount
} from '../controllers/pollController.js'

router.route('/').post(createPoll)
router.route('/:id').get(getPoll)
router.route('/increase').patch(increaseCount)
export default router