import {AuthController} from "./auth.controller";

const controller = new AuthController()

const authRoute = [
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
