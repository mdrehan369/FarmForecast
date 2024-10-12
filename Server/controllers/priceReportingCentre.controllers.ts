import { asyncHandler } from '../utils/AsyncHandler'
import { priceReportingCentreSchema } from '../zodSchemas/schema'
import { prismaClient } from '../utils/prismaClient'
import { ApiResponse } from '../utils/ApiResponse'

const addPriceReportingCentre = asyncHandler(async (req, res) => {
    const postData = req.body

    // Checks the schema or throws error
    priceReportingCentreSchema.parse(postData)
    const { headName, name, headDocuments, address } = req.body

    const prevCentreByName = await prismaClient.priceReportingCentre.findFirst({
        where: {
            name,
        },
    })

    if (prevCentreByName)
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    'Centre already exists by the same name'
                )
            )

    const prevCentreByDocuments =
        await prismaClient.priceReportingCentre.findFirst({
            where: {
                headDocuments,
            },
        })

    if (prevCentreByDocuments)
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {},
                    'Centre already exists by the same head documents'
                )
            )

    const newCentre = await prismaClient.priceReportingCentre.create({
        data: {
            headName,
            name,
            address: {
                create: address,
            },
            headDocuments: {
                create: headDocuments,
            },
        },
        include: {
            address: true,
            headDocuments: true,
        },
    })

    return res
        .status(201)
        .json(new ApiResponse(201, newCentre, 'Centre registered successfully'))
})

const getAllPriceData = asyncHandler(async (req, res) => {
    const id = req.params.centreId
    const data = await prismaClient.priceData.findMany({
        include: {
            priceReportingCentre: true
        },
        where: {
            priceReportingCentre: {
                id: Number(id),
            },
        },
        orderBy: {
            date: 'desc',
        },
    })

    return res
        .status(200)
        .json(new ApiResponse(200, data, 'fetched successfully!'))
})

export { addPriceReportingCentre, getAllPriceData }
