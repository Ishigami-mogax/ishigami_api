import Lab from '@hapi/lab'
import {Server, ServerInjectResponse} from "@hapi/hapi";
import {User} from "./auth.schema";
import {init} from "../../server";
import {PrismaClient} from "@prisma/client";
import {expect} from "@hapi/code";

const prisma:PrismaClient = new PrismaClient()
const lab: Lab.script.Script = exports.lab = Lab.script()

lab.describe('POST /register', () => {
    let server: Server
    let fakeData: User

    lab.before(async () => {
        server = await init()
        fakeData = {
            "id": "38ef649f-10bd-4f94-88d3-81396bb36eb4",
            "email": "pihihv",
            "password": "",
            "createdAt": null,
            "role_id": "7281bb2e-7f8e-4d02-9539-edba4ad8f456"
        }
        await prisma.role.create({
            data:{
                id:'7281bb2e-7f8e-4d02-9539-edba4ad8f456',
                name:'Member'
            }
        })
    })

    lab.after(async () => {
        await prisma.user.deleteMany()
        await prisma.role.deleteMany()
        await server.stop()
    })

    lab.it('Add an user', async () => {

        const res: ServerInjectResponse = await server.inject({
            method: 'POST',
            url: '/register',
            payload:fakeData
        })

        expect(res.statusCode).to.equal(200)
        expect(res.result).to.be.an.object()
        expect(res.result).to.equal(fakeData)
    })
})
