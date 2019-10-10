import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IApiResponse } from '../models/api-response.model';
import { Exercise } from '../models/exercises/exercise.model';
import { Observable } from 'rxjs';
import { ExerciseDelete } from '../models/exercises/exercise-delete.model';
import { ExerciseCreate } from '../models/exercises/exercise-create.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private http: HttpClient
  ) { }

  allExercises(): Observable<Exercise[]> {
    return this.http.get<IApiResponse>('exercises')
      .pipe(map(result => {
        return result.data as Exercise[]
      }))
  }

  createExercise(exercise: ExerciseCreate): Observable<IApiResponse> {
    return this.http.post<IApiResponse>('exercises', exercise)
      .pipe(map(result => {
        return result as IApiResponse
      }))
  }

  editExercise(exercise: Exercise): Observable<IApiResponse> {
    return this.http.put<IApiResponse>('exercises', exercise)
      .pipe(map(result => {
        return result as IApiResponse
      }))
  }

  deleteExercise(exercise: ExerciseDelete): Observable<IApiResponse> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: exercise.id
      }
    }
    return this.http.delete<IApiResponse>('exercises', options)
      .pipe(map(result => {
        return result as IApiResponse
      }))
  }
}
