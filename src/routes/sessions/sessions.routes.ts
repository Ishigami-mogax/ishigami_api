import {SessionsController} from "./sessions.controller";

const controller = new SessionsController()
const SessionRoute = [
    {
        method:'GET',
        path:'/sessions',
        handler:controller.getQuickSession,
        options: {
            tags: ['api']
        }
    }
]

export default SessionRoute
