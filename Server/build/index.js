'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const app_1 = require('./app')
const prismaClient_1 = require('./utils/prismaClient')
const port = process.env.PORT || 3000
prismaClient_1.prismaClient
    .$connect()
    .then(() => {
        console.log('Database connected!')
        app_1.app.listen(port, () => {
            console.log(`Listening on https://localhost:${port}`)
        })
    })
    .catch((reason) =>
        console.log('Connection to database failed due to', reason)
    )
