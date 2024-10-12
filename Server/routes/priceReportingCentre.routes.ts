import { Router } from "express";
import { addPriceReportingCentre, getAllPriceData } from "../controllers/priceReportingCentre.controllers";
import { staffMiddleware } from "../middlewares/staff.middlewares";

const router = Router()

// Only staff members can access this api route
router.use(staffMiddleware)

router.route("/").post(addPriceReportingCentre)
router.route("/:centreId").get(getAllPriceData)

export default router