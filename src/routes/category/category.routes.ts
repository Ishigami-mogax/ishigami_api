import {CategoryController} from "./category.controller";

const controller = new CategoryController()

const categoryRoute = [
    {
        method:'POST',
        path:'/categories',
        handler:controller.createOne,
        options: {
            tags: ['api']
        }
    },
    {
        method:'GET',
        path:'/categories/{id}',
        handler:controller.getOne,
        options: {
            tags: ['api']
        }
    },
    {
        method:'GET',
        path:'/categories',
        handler:controller.getOne,
        options: {
            tags: ['api']
        }
    }
]

export default categoryRoute
