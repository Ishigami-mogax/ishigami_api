'use strict'
import Hapi from "@hapi/hapi"
import { Server } from "@hapi/hapi"

export let server: Server;

//Function -> Initialization of server
export const init = async function(): Promise<Server> {

    //Set server
    server = Hapi.server({
        port: process.env.PORT || 4000,
        host: process.env.HOST || 'localhost',
        routes: {
            cors: {
                origin: ["*"] // an array of origins or 'ignore'
            }
        }
    })

    //Add routes: server.route()

    return server
}

//Function for start server
export const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
    return server.start()
}

//If error
process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err)
    process.exit(1)
})
