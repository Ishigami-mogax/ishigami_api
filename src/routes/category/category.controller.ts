import Hapi from "@hapi/hapi";
import {CategoryService} from "./category.service";

export class CategoryController {

    public async createOne(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        try {
            const {name, superId} = request.payload as {name:string, superId:string}
            const category = await new CategoryService().createCategory(name, superId)
            return h.response("").code(200)
        } catch (error:unknown) { //TODO Change any
            if(error instanceof Error){
                return h.response(error.message).code(500)
            } else {
                return h.response('').code(500)
            }
        }

    }

    public async getOne(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        try {
            const categories = await new CategoryService().getCategory(request.params.id, "137efd35-fc95-4478-9d95-de0db07c93b0")
            return h.response(categories).code(200)
        } catch (error:unknown) { //TODO Change any
            if(error instanceof Error){
                return h.response(error.message).code(500)
            } else {
                return h.response('').code(500)
            }
        }
    }
}
