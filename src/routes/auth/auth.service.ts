import { PrismaClient } from "@prisma/client"

export class AuthService {

    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async insertUser(id:string, email:string) {
        try {
            this.prisma.user.create({
                data:{
                    id,
                    email,
                    role_id:"",
                    password:""
                }
            })
        } catch (e) {
            console.log(e)
        } finally {
            await this.prisma.$disconnect()
        }
    }

}
