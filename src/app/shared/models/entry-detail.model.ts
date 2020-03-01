import { Exercise } from './exercises/exercise.model';

export class EntryDetail {
    id: number
    exercise: Exercise
    weight: number
    reps: number
    rest: number
    sets: number
    date: Date
    comment: string
    get isDone() { return this.date ? true : false; }
}
