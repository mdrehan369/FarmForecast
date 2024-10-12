import { Request } from 'express'
import { IJwtPayload } from '../types/jwt.types'
import jwt from 'jsonwebtoken'
import { Role, User } from '@prisma/client'

const getDecodedToken = (req: Request): IJwtPayload => {
    const accessToken = req.cookies.accessToken || req.headers.accessToken
    const decodedToken: IJwtPayload = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_KEY!
    ) as IJwtPayload
    return decodedToken
}

const generateAccessToken = (user: User, role: Role): string => {
    const accessToken = jwt.sign(
        {
            id: user.id,
            role: role,
        },
        process.env.JWT_SECRET_KEY!,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    )
    return accessToken
}

export { getDecodedToken, generateAccessToken }
