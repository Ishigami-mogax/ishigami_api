import { PrismaClient } from "@prisma/client"

export class SessionsService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async getWordsDaily() {
        try {

            const wordExerciseList = await this.prisma.word_exercise.findMany()

            return wordExerciseList
        } catch (e) {
            console.log(e)
        } finally {
            await this.prisma.$disconnect()
        }
    }
}
