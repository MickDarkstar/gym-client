export class ExerciseCreate {
    muscleId: number
    name: string
    type: string
    level: string

    constructor() {
        this.muscleId = 1
        this.name = null
        this.type = null
        this.level = null
    }
}

export interface IExerciseCreate {
    muscleId: number
    name: string
    type: string
    level: string
}
