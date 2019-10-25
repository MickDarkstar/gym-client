import { Exercise } from '@src/app/shared/models/exercises/exercise.model';

export class EntryDetail {
    id: number
    exercise: Exercise
    weight: number
    reps: number
    rest: number
    sets: number
    date: Date
    comment: string
    done: boolean
}
