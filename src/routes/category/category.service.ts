import { PrismaClient } from "@prisma/client"
import {randomUUID} from "crypto";

export class CategoryService {

    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    public getCategory = async (id: string, userId: string) => {
        const category = await this.prisma.category.findFirst({
            where: {
                id: id,
                word_list: {
                    every: {
                        user_id: userId
                    }
                }
            },
            include: {
                other_category: {
                    include: {
                        word_list: true,
                        _count: {
                            select: {
                                word_list: true
                            }
                        }
                    }
                },
                word_list: {
                    include: {
                        word_level: true,
                        word: {
                            include: {
                                reading: true
                            }
                        }
                    }
                }
            }
        });

        if (!category) return category;

        const percent = calculatePercent(category.word_list);

        const otherCategory = category.other_category.map((word) => {
            const percent = calculatePercent(word.word_list)
            const {word_list, ...result} = word;
            return {...result, percent: {word_list: percent}}
        });

        return {...category, other_category: otherCategory, percent: {word_list: percent}};
    }

    public async createCategory(name:string, superId:string) {
        try {
            await this.prisma.category.create({
                data:{
                    id:randomUUID(),
                    name,
                    super_category_id:superId
                }
            })
        } catch (e) {
            console.log(e)
        } finally {
            await this.prisma.$disconnect()
        }
    }
}

const calculatePercent = (array: any[]) => {
    const nbMots = array.length * 5;

    const total = array.reduce((acc, cur) => {
        return acc + cur.level_id
    }, 0)

    if (nbMots !== 0) {
        return (total / nbMots).toFixed(2);
    }

    return 0;
}

