import { PrismaClient, user } from "@prisma/client"

export class AuthService {

    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async insertUser(id:string, email:string): Promise<user | undefined> {
        try {

            return await this.prisma.user.create({
                data:{
                    id,
                    email,
                    role_id:"7281bb2e-7f8e-4d02-9539-edba4ad8f456",
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
