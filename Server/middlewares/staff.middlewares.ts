import { asyncHandler } from "../utils/AsyncHandler"
import { ApiResponse } from "../utils/ApiResponse"
import jwt from "jsonwebtoken"
import { IJwtPayload } from "../types/jwt.types"
import { ApiError } from "../utils/ApiError"

export const staffMiddleware = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken || req.headers.accessToken
    if (!accessToken) {
        console.log("Not Authorised")
        return res.status(403).json(new ApiResponse(403, "Not Authorized"))
    }

    const decodedToken: IJwtPayload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as IJwtPayload
    if(decodedToken.role === "STAFF") {
        return next()
    } else {
        console.log("Not Authorised")
        return res.status(403).json(new ApiResponse(403, "Not Authorized"))
    }
    
})