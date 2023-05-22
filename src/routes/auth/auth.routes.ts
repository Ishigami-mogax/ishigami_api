import {AuthController} from "./auth.controller";
import Hapi from "@hapi/hapi";

const controller: AuthController = new AuthController()

const authRoute: Hapi.ServerRoute[] = [
    {
        method:'POST',
        path:'/register',
        handler:controller.register,
        options: {
            tags: ['api']
        }
    }
]

export default authRoute
