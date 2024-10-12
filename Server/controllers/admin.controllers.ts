import { asyncHandler } from '../utils/AsyncHandler'
import { prismaClient } from '../utils/prismaClient'
import { Address, Documents, Role, User } from '@prisma/client'
import { ApiResponse } from '../utils/ApiResponse'
import { ApiError } from '../utils/ApiError'
import { FullUser } from '../types/user.types'
import { generateAccessToken, getDecodedToken } from '../utils/jwtHelpers'
import { hashPassword, isCorrectPassword } from '../utils/passwordHashing'
import { adminPostDataSchema } from '../zodSchemas/schema'

type PostData = {
    user: User
    address: Address[]
    documents: Documents
}

export const options = {
    httpOnly: true,
}

const createAdmin = asyncHandler(async (req, res) => {
    const postData = req.body

    // Throws error if the data does not match with the schema
    adminPostDataSchema.parse(postData)

    const { user, address, documents }: PostData = postData

    const prevAdmin = await prismaClient.user.findFirst({
        where: {
            OR: [{ email: user.email }, { phoneNumber: user.phoneNumber }],
        },
    })
    if (prevAdmin) throw new ApiError(400, 'Admin already exists')

    const docs = await prismaClient.documents.findFirst({
        where: {
            OR: [
                { aadharCardNumber: documents.aadharCardNumber },
                { voterIdNumber: documents.voterIdNumber },
                { panCardNumber: documents.panCardNumber },
            ],
        },
    })
    if (docs)
        throw new ApiError(400, 'Admin already exists with the given documents')

    user.password = hashPassword(user.password)

    const admin: FullUser | null = await prismaClient.user.create({
        data: {
            ...user,
            type: 'ADMIN',
            address: {
                create: address,
            },
            documents: {
                create: documents,
            },
        },
        include: {
            address: true,
            documents: true,
        },
    })

    const accessToken = generateAccessToken(admin, 'ADMIN')

    if (!admin) throw new ApiError(500, 'Error While creating the admin')
    return res
        .status(201)
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(201, admin, 'Created Successfully!'))
})

const getAdminDetails = asyncHandler(async (req, res) => {
    const { id } = getDecodedToken(req)

    const admin = await prismaClient.user.findUnique({
        where: {
            id: id,
        },
    })

    if (!admin)
        return res.status(404).json(new ApiResponse(200, {}, 'Admin not found'))
    else admin.password = ''

    return res
        .status(200)
        .json(new ApiResponse(200, admin, 'Fetched Successfully'))
})

const login = asyncHandler(async (req, res) => {
    const { phoneNumber, password }: { phoneNumber: string; password: string } =
        req.body
    const admin = await prismaClient.user.findUnique({
        where: {
            phoneNumber,
        },
    })
    if (!admin) throw new ApiError(404, 'Admin does not exists')
    if (!isCorrectPassword(admin.password, password))
        throw new ApiError(403, 'Wrong Password')

    const accessToken = generateAccessToken(admin, 'ADMIN')

    admin.password = ''

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(200, admin, 'LoggedIn'))
})

const registerStaff = asyncHandler(async (req, res) => {
    const postData = req.body
    const { user, address, documents }: PostData = postData

    // Throws error if the data does not match with the schema
    adminPostDataSchema.parse(postData)

    const prevStaff = await prismaClient.user.findFirst({
        where: {
            OR: [{ phoneNumber: user.phoneNumber }, { email: user.email }],
        },
    })

    if (prevStaff)
        throw new ApiError(
            400,
            'Staff already exists with the given credentials'
        )

    const docs = await prismaClient.documents.findFirst({
        where: {
            OR: [
                { aadharCardNumber: documents.aadharCardNumber },
                { voterIdNumber: documents.voterIdNumber },
                { panCardNumber: documents.panCardNumber },
            ],
        },
    })
    if (docs)
        throw new ApiError(400, 'Staff already exists with the given documents')

    user.password = hashPassword(user.password)

    const staff = await prismaClient.user.create({
        data: {
            ...user,
            address: {
                create: address
            },
            documents: {
                create: documents
            },
        },
        include: {
            address: true,
            documents: true,
        },
    })
    if (!staff)
        throw new ApiError(500, 'Some error occured while creating the staff')

    return res
        .status(201)
        .json(new ApiResponse(201, staff, 'Staff created successfully'))
})

const getAllStaffs = asyncHandler(async (req, res) => {

    const { pageSize, pageNumber } = req.query

    // if(Number(pageSize))

    const staffs = await prismaClient.user.findMany({
        where: {
            type: 'STAFF',
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            address: true,
            documents: true
        },
        take: Number(pageSize) || 10,
        skip: Number(pageNumber) ? Number(pageNumber) * Number(pageSize): 0
    })
    return res
        .status(200)
        .json(new ApiResponse(200, staffs, 'Fetched Successfully'))
})

const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie('accessToken', options)
        .json(new ApiResponse(200, {}, 'Logged Out'))
})

export {
    createAdmin,
    getAdminDetails,
    login,
    registerStaff,
    getAllStaffs,
    logout,
}
