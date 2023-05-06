import Hapi from "@hapi/hapi"
import {SessionsService} from "./sessions.service";

export class SessionsController {
    public async getQuickSession(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            const words = await new SessionsService().getWordsDaily()
            return h.response(words).code(200)

        } catch (error:unknown) { //TODO Change any
            if(error instanceof Error){
                return h.response(error.message).code(500)
            } else {
                return h.response('').code(500)
            }
        }
    }

}
