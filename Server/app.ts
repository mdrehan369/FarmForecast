import express from "express"
import cors from "cors"
import adminRouter from "./routes/admin.routes"
import staffRouter from "./routes/staff.routes"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: '16kb'}))
app.use(cors())
app.use(cookieParser())

app.use("/api/v1/admins", adminRouter)
app.use("/api/v1/staffs", staffRouter)

export {
    app
}