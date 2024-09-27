import express from "express"
import { adminMiddleware } from "../middlewares/admin.middlewares"
import { createAdmin, getAdminDetails, getAllStaffs, login, logout, registerStaff } from "../controllers/admin.controllers"

const router = express.Router()

router.route("/").post(createAdmin)
router.route("/").get(login)

// Protected Routes

router.route("/admin").get(adminMiddleware, getAdminDetails)
router.route("/staff").post(adminMiddleware, registerStaff)
router.route("/staff").get(adminMiddleware, getAllStaffs)
router.route("/logout").get(adminMiddleware, logout)

export default router