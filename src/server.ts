'use strict'
import Hapi from "@hapi/hapi"
import { Server } from "@hapi/hapi"
import sessionsRoutes from "./routes/sessions/sessions.routes";

export let server: Server;

//Function -> Initialization of server
export const init:() => Promise<Server> = async (): Promise<Server> => {

    //Set server
    server = Hapi.server({
        port: process.env.PORT || 4000,
        host: process.env.HOST || 'localhost',
        routes: {
            cors: true
        }
    })

    //Add routes: server.route()
    server.route(sessionsRoutes)

    return server
}

//Function for start server
export const start:() => Promise<void> = async (): Promise<void> => {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
    return server.start()
}

//If error
process.on('unhandledRejection', (err:Error):void => {
    console.error("unhandledRejection");
    console.error(err)
    process.exit(1)
})
