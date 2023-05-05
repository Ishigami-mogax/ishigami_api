export type ExerciseWord = {
    word_list_id: string,
    exercise_id: string,
    validate: boolean | null,
    exercise: {
        id: string,
        description: string,
        method_id: string
    }
}

export type ValidationCount = {
    word_list_id: string,
    method_id: string,
    count: number
}

export type WordCount = {
    word_list_id: string,
    count: number
}

export type WordPower = {
    word_list_id:string,
        power: number
}

export type ExerciseCount = {
    listExercise: string[],
    totalPower:number,
    words: WordPower[]
}

export type ExerciseListWordList = {
    exerciseList:string[]
    wordList:string[]
}
