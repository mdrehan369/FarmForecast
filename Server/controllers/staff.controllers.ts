import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'
import { asyncHandler } from '../utils/AsyncHandler'
import { generateAccessToken, getDecodedToken } from '../utils/jwtHelpers'
import { isCorrectPassword } from '../utils/passwordHashing'
import { prismaClient } from '../utils/prismaClient'
import { options } from './admin.controllers'

const login = asyncHandler(async (req, res) => {
    const { phoneNumber, password }: { phoneNumber: string; password: string } =
        req.body
    const staff = await prismaClient.user.findUnique({
        where: {
            phoneNumber,
            type: 'STAFF',
        },
    })
    if (!staff) throw new ApiError(404, 'Staff does not exists')
    if (!isCorrectPassword(staff.password, password))
        throw new ApiError(403, 'Wrong Password')

    const accessToken = generateAccessToken(staff, 'STAFF')

    staff.password = ''

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json(new ApiResponse(200, staff, 'LoggedIn'))
})

const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie('accessToken', options)
        .json(new ApiResponse(200, {}, 'Logged Out'))
})

const getStaffDetails = asyncHandler(async (req, res) => {
    const { id } = getDecodedToken(req)
    const staff = await prismaClient.user.findFirst({
        where: {
            id,
        },
    })
    return res.status(200).json(new ApiResponse(200, staff, 'Fetched!'))
})

export { login, logout, getStaffDetails }
