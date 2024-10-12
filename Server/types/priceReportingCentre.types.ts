import { Prisma } from '@prisma/client'

export type FullPriceReportingCentre = Prisma.PriceReportingCentreGetPayload<{
    include: {
        headDocuments: true
        address: true
    }
}>
