export class Exercise {
    id: number
    createdByUserId: number
    muscleId: number
    name: string
    type: string
    level: string
}

export interface IExercise {
    id: number
    createdByUserId: number
    muscleId: number
    name: string
    type: string
    level: string
}