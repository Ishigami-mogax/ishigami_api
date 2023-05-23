import { PrismaClient } from "@prisma/client"
import {createMethodList, getWordAndExercise} from "../../utils/sessions";
import {ExerciseWord} from "./sessions.schema";

export class SessionsService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async getWordsDaily() {
        try {

            const wordExerciseList:ExerciseWord[] = await this.prisma.word_exercise.findMany({
                include:{
                    exercise:true
                }
            }) as ExerciseWord[]

            const {exerciseListId, wordListId} = getWordAndExercise(wordExerciseList, 5)

            const wordList = await this.prisma.word_list.findMany({
                where:{
                    user:{
                        id:"137efd35-fc95-4478-9d95-de0db07c93b0"
                    },
                    id:{
                        in:wordListId
                    }
                },
                select: {
                    word: {
                        select: {
                            id: true,
                            kanji: true,
                            signification: true,
                            reading: true
                        }
                    }
                }
            })

            return createMethodList(wordList, exerciseListId)
        } catch (e) {
            console.log(e)
        } finally {
            await this.prisma.$disconnect()
        }
    }
}
