import Hapi from "@hapi/hapi";

export class AuthController {
    public async register(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            console.log(request.payload)
            return h.response("words").code(200)
        } catch (error:unknown) { //TODO Change any
            if(error instanceof Error){
                return h.response(error.message).code(500)
            } else {
                return h.response('').code(500)
            }
        }
    }
}
