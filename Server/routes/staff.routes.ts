import express from "express"
import { staffMiddleware } from "../middlewares/staff.middlewares"

const router = express.Router()

router.use(staffMiddleware)

export default router