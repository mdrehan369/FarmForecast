import { PriceData } from '@prisma/client'
import { asyncHandler } from '../utils/AsyncHandler'
import { priceDataSchema } from '../zodSchemas/schema'
import { prismaClient } from '../utils/prismaClient'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'
import { getDecodedToken } from '../utils/jwtHelpers'

const addPriceData = asyncHandler(async (req, res) => {
    const data: PriceData = req.body

    // Checks the data schemaapp.use('/api/v1/centre', centreRouter)

    priceDataSchema.parse(data)

    const centre = await prismaClient.priceReportingCentre.findUnique({
        where: {
            id: data.priceReportingCentreId
        },
    })

    if (!centre) throw new ApiError(400, 'No centre exists with the given id')

    // const decodedToken = getDecodedToken(req)

    const priceData = await prismaClient.priceData.create({
        data: {
            ...data,
            staffId: 4
        }
    })

    return res.status(201).json(new ApiResponse(201, priceData, 'Saved!'))
})

export { addPriceData }
