import { asyncHandler } from "../utils/AsyncHandler";
import { FullPriceReportingCentre } from "../types/priceReportingCentre.types";


const addPriceReportingCentre = asyncHandler(async (req, res) => {
    const { headName, name, headDocuments, address }: FullPriceReportingCentre = req.body
    
})