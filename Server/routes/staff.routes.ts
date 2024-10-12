import express from 'express'
import { staffMiddleware } from '../middlewares/staff.middlewares'
import {
    getStaffDetails,
    login,
    logout,
} from '../controllers/staff.controllers'

const router = express.Router()

router.route('/').post(login)

// Protected Routes
router.route('/').get(staffMiddleware, getStaffDetails)
router.route('/logout').get(staffMiddleware, logout)

export default router
