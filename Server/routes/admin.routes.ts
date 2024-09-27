import express from "express"
import { adminMiddleware } from "../middlewares/admin.middlewares"
import { createAdmin, getAdminDetails, getAllStaffs, login, registerStaff } from "../controllers/admin.controllers"

const router = express.Router()

router.route("/").post(createAdmin)
router.route("/").get(login)

// Protected Routes

router.route("/admin").get(adminMiddleware, getAdminDetails)
router.route("/staff").post(adminMiddleware, registerStaff)
router.route("/staff").get(adminMiddleware, getAllStaffs)

export default router