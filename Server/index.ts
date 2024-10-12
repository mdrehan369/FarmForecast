import { app } from './app'
import { prismaClient } from './utils/prismaClient'

const port = process.env.PORT || 3000

prismaClient
    .$connect()
    .then(() => {
        console.log('Database connected!')
        app.listen(port, () => {
            console.log(`Listening on http://localhost:${port}`)
        })
    })
    .catch((reason) =>
        console.log('Connection to database failed due to', reason)
    )
