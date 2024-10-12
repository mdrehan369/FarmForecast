import { Router } from "express";
import { addPriceData } from "../controllers/priceData.controller";
import { staffMiddleware } from "../middlewares/staff.middlewares";

const router = Router()

// router.use(staffMiddleware)

router.route("/").post(addPriceData)

export default router