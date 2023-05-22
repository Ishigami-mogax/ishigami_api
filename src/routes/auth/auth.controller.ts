import Hapi from "@hapi/hapi";
import {AuthService} from "./auth.service";
import {user} from '@prisma/client'

export class AuthController {
    public async register(request: Hapi.Request, h: Hapi.ResponseToolkit):Promise<Hapi.ResponseObject> {
        try {

            const {id, email} = request.payload as {id:string, email:string}

            const user: user | undefined = await new AuthService().insertUser(id, email)

            return h.response(user).code(200)
        } catch (error:unknown) { //TODO Change any
            if(error instanceof Error){
                return h.response(error.message).code(500)
            } else {
                return h.response('').code(500)
            }
        }
    }
}
