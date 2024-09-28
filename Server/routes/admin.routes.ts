import express from "express"
import { adminMiddleware } from "../middlewares/admin.middlewares"
import { createAdmin, getAdminDetails, getAllStaffs, login, logout, registerStaff } from "../controllers/admin.controllers"

const router = express.Router()

router.route("/register").post(createAdmin)
router.route("/login").post(login)

// Protected Routes

router.route("/").get(adminMiddleware, getAdminDetails)
router.route("/staff").post(adminMiddleware, registerStaff)
router.route("/staff").get(adminMiddleware, getAllStaffs)
router.route("/logout").get(adminMiddleware, logout)

export default router