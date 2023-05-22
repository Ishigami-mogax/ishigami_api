import {
    ExerciseCount,
    ExerciseListWordList,
    ExerciseWord,
    ValidationCount,
    WordCount, WordPower
} from "../routes/sessions/sessions.schema";

export const getWordAndExercise = (wordExerciseList:ExerciseWord[], size:number) : ExerciseListWordList => {

    //Liste des exercices à faire, répartit en différente liste en fonction de leur dépendance entre eux.
    const listExercise1: ExerciseCount[] = [
        {
            listExercise:['f32cf5e1-72ec-4ef6-8bc4-a32ff643f664', '1725041b-b6db-4a36-b746-63c695ebeb5f', '767cec85-0af4-42c3-abfa-a3bb9d709542'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['f32cf5e1-72ec-4ef6-8bc4-a32ff643f664', '8840d164-1a79-4467-a282-f24c4d5ee46d', '767cec85-0af4-42c3-abfa-a3bb9d709542'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['32fbee9d-b1b5-46c9-9c26-7950ace1b552', '1725041b-b6db-4a36-b746-63c695ebeb5f', '767cec85-0af4-42c3-abfa-a3bb9d709542'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['35534ca1-c788-437b-9c13-7de31e82e3ec', '8840d164-1a79-4467-a282-f24c4d5ee46d', '767cec85-0af4-42c3-abfa-a3bb9d709542'],
            totalPower:0,
            words:[]
        },

        {
            listExercise:['f32cf5e1-72ec-4ef6-8bc4-a32ff643f664', '1725041b-b6db-4a36-b746-63c695ebeb5f', '37234d6e-bca3-489f-b484-7f6259ff5836'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['f32cf5e1-72ec-4ef6-8bc4-a32ff643f664', '8840d164-1a79-4467-a282-f24c4d5ee46d', '37234d6e-bca3-489f-b484-7f6259ff5836'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['32fbee9d-b1b5-46c9-9c26-7950ace1b552', '1725041b-b6db-4a36-b746-63c695ebeb5f', '37234d6e-bca3-489f-b484-7f6259ff5836'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['35534ca1-c788-437b-9c13-7de31e82e3ec', '8840d164-1a79-4467-a282-f24c4d5ee46d', '37234d6e-bca3-489f-b484-7f6259ff5836'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['f32cf5e1-72ec-4ef6-8bc4-a32ff643f664', '1725041b-b6db-4a36-b746-63c695ebeb5f', '13544472-d49c-4880-a2d4-59c677454dad'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['f32cf5e1-72ec-4ef6-8bc4-a32ff643f664', '8840d164-1a79-4467-a282-f24c4d5ee46d', '13544472-d49c-4880-a2d4-59c677454dad'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['32fbee9d-b1b5-46c9-9c26-7950ace1b552', '1725041b-b6db-4a36-b746-63c695ebeb5f', '13544472-d49c-4880-a2d4-59c677454dad'],
            totalPower:0,
            words:[]
        },
        {
            listExercise:['35534ca1-c788-437b-9c13-7de31e82e3ec', '8840d164-1a79-4467-a282-f24c4d5ee46d', '13544472-d49c-4880-a2d4-59c677454dad'],
            totalPower:0,
            words:[]
        }
    ]

    //Récupère la liste de tous les exercices et renvoie une liste avec le nombre de False ou null par méthode et par word.
    const validationList: ValidationCount[] = countValidationByWordListAndMethod(wordExerciseList)
    //Récupère la liste groupée de la fonction précédente et renvoie la liste du nombre de False & null maximum pour chaque word.
    const wordLevelList: WordCount[] = groupByWordList(validationList)

    //Récupère tous les mots de niveau 1
    let filteredWordList: WordCount[] = wordLevelList.filter((e:WordCount)=> e.count === 1)
    if (filteredWordList.length < size) { //Si tous les mots de niveau 1 ne dépasse pas le nombre voulu
        filteredWordList = [...filteredWordList, ...wordLevelList.filter((e:WordCount) => e.count === 2)] //On ajoute les nombres de niveau 2
    }

    //TODO Possible optimisation, si le nombre de mots ne dépasse pas le nombre de mots voulu les étapes au-dessus sont inutiles
    if (filteredWordList.length < size) { //Si tous les mots de niveau 2 ne dépasse pas le nombre voulu
        filteredWordList = [...wordLevelList] //On récupère tous les mots
    }

    // Récupère les informations des WordExercise avec les id récupérer dans les étapes précédentes
    const selectedWordList: ExerciseWord[] = [...wordExerciseList.filter((e:ExerciseWord) => filteredWordList.some((a:WordCount) => a.word_list_id === e.word_list_id))]

    //Récupère le groupe de la liste d'exercice n°1, ayant le plus de valeur
    const selectedExercise: ExerciseCount = countPowerByExercise(selectedWordList, listExercise1).reduce((acc:ExerciseCount, obj:ExerciseCount) => obj.totalPower > acc.totalPower ? obj : acc)

    const limitedSelectWord = {...selectedExercise, words: selectedExercise.words.sort((a, b) => b.power - a.power).slice(0, size)}

    //On regroupe tous les exercices choisis
    const allExerciseSelected: string[] = [...limitedSelectWord.listExercise, '89c180c5-fd2b-4222-98cb-dc7abd455c39']

    //On regroupe tous les mots choisis
    const allWordSelected: string[] = limitedSelectWord.words.map((w:WordPower) => w.word_list_id)

    return {exerciseListId:allExerciseSelected, wordListId:allWordSelected}

}

//On regroupe les exercices par méthode et par mot et récupérant le nombre de False ou Null
const countValidationByWordListAndMethod = (data: ExerciseWord[]) : ValidationCount[] => {
    return data.reduce((acc: ValidationCount[], curr: ExerciseWord) => {
        if (!curr.validate) { //Si validate est False ou Null
            const existingCount: ValidationCount | undefined = acc.find((item:ValidationCount) => // On cherche si une validation pour ce mot et cette méthode a déjà été créé
                item.word_list_id === curr.word_list_id &&
                item.method_id === curr.exercise.method_id
            )
            if (existingCount) { // Si la validation existe, on ajoute +1 au compte
                existingCount.count += 1;
            } else { // Sinon, on crée la validation
                acc.push({
                    word_list_id: curr.word_list_id,
                    method_id: curr.exercise.method_id,
                    count: 1,
                });
            }
        }
        return acc // On retourne la liste de validation mise à jour
    }, []) // Puis, on retourne la liste de validation complète
}

//On récupère uniquement le maximum de False ou Null par mot
const groupByWordList = (data: ValidationCount[]) : WordCount[] => {
    return data.reduce(
        (acc:WordCount[] , item :ValidationCount) => {

            let index: number = acc.findIndex((e:WordCount):boolean => e.word_list_id === item.word_list_id) // On récupère l'index de l'item dans la liste de WordCount
            if (index === -1) { // Si le mot n'existe pas dans la liste, on le crée
                index = acc.push({word_list_id:item.word_list_id, count:0 }) - 1
            }

            // Puis si la valeur courante est supérieur, à la valeur enregistrée, on la met à jour
            if(acc[index].count < item.count) acc[index].count = item.count

            return acc // Puis, on retourne la liste à jour
        }, []) //Puis, on retourne la liste WordCount complète
}

//On remplit pour chaque groupe d'exercice les mot qui correspond avec leur puissance
const countPowerByExercise = (wordList:ExerciseWord[], exerciseList:ExerciseCount[]) : ExerciseCount[] => {
    wordList.map((exerciseWord:ExerciseWord) => { //Pour chaque ExerciceWord
        exerciseList.map((exerciseCount:ExerciseCount) => { // Pour chaque groupe d'exercice
            if((exerciseWord.validate === false || exerciseWord.validate === null) && exerciseCount.listExercise.includes(exerciseWord.exercise_id)){ // On vérifie si l'exercice est False ou Null et s'il se trouve dans le groupe d'exercice
                const index:number = exerciseCount.words.findIndex((a:WordPower) => a.word_list_id === exerciseWord.word_list_id)  //On cherche l'index du mot dans la liste de mot de l'exercice
                if(index === -1) { // Si le mot n'existe pas, on le crée avec une puissance minimum de 1.
                    exerciseCount.words.push({
                        word_list_id:exerciseWord.word_list_id,
                        power:1
                    })
                } else { //Si le mot existe déjà, ça veut dire que le mot correspond à plusieurs exercices du groupe, on augmente donc sa puissance
                    exerciseCount.words[index] = {...exerciseCount.words[index], power:exerciseCount.words[index].power + 1}
                }

                exerciseCount.totalPower = exerciseCount.totalPower + 1 // On augmente la puissance totale du groupe d'exercice afin de ne pas le calculé plus tard
            }
        })
    })

    return exerciseList // On renvoie la liste du compte par groupe d'exercice
}

export const createMethodList = (wordList, exerciseListId) => {

    const tempFirstPair = []
    const tempSecondPair = []
    const tempGuess = []
    const tempRecall = []
    const tempType = []
    const tempResult = []

    wordList.map(({word}) => {
        const tempPair = createPairList(word, exerciseListId)
        tempFirstPair.push(tempPair[0])
        tempSecondPair.push(tempPair[1])

        tempGuess.push(createGuessList(word, exerciseListId))
        tempRecall.push({
            id: word.id,
            sharp: word.kanji,
            blur: word.signification,
        })
        tempType.push(createTypeList(word, exerciseListId))

    })

}

const createPairList = (word, exerciceList) => {

    const francais = {
        id:word.id,
        value:word.signification,
        validate:false
    }
    const kanji = {
        id:word.id,
        value:word.kanji,
        validate:false
    }
    const kana = {
        id:word.id,
        value:word.reading.reduce((acc, cur) => acc + ' / ' + cur.reading, ""),
        validate:false
    }

    if(exerciceList.includes("37234d6e-bca3-489f-b484-7f6259ff5836")) {
        return [francais, kana]
    } else if (exerciceList.includes("13544472-d49c-4880-a2d4-59c677454dad")) {
        return [kanji, kana]
    } else {
        return [kanji, francais]
    }
}

const createGuessList = (word, exerciceList) => {
    if(exerciceList.includes("35534ca1-c788-437b-9c13-7de31e82e3ec")) {
        return {
            id:word.id,
            offer:word.reading.reduce((acc, cur) => acc + ' / ' + cur.reading, ""),
            toFind:word.signification
        }
    } else if (exerciceList.includes("32fbee9d-b1b5-46c9-9c26-7950ace1b552")) {
        return {
            id:word.id,
            offer:word.kanji,
            toFind:word.reading.reduce((acc, cur) => acc + ' / ' + cur.reading, "")
        }
    } else {
        return {
            id:word.id,
            offer:word.signification,
            toFind:word.kanji
        }
    }
}

const createTypeList = (word, exerciceList) => {
    const readingList = {
        on: word.reading.filter((r) => r.isOnyumi).map((r) => ({
                reading: r.reading,
                validate: false
            })
        ),
        kun: word.reading.filter((r) => !r.isOnyumi).map((r) => ({
                reading: r.reading,
                validate: false
            })
        ),
    }

    if(exerciceList.includes("8840d164-1a79-4467-a282-f24c4d5ee46d")) {
        return {
            id:word.id,
            offer:word.kanji,
            ...readingList
        }
    } else {
        return {
            id:word.id,
            offer:word.signification,
            ...readingList
        }
    }
}
