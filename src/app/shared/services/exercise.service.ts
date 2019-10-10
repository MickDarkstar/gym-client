import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
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
    return this.http.get<ApiResponse>('exercises')
      .pipe(map(result => {
        return result.data as Exercise[]
      }))
  }

  createExercise(exercise: ExerciseCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('exercises', exercise)
      .pipe(map(result => {
        return result as ApiResponse
      }))
  }

  editExercise(exercise: Exercise): Observable<ApiResponse> {
    return this.http.put<ApiResponse>('exercises', exercise)
      .pipe(map(result => {
        return result as ApiResponse
      }))
  }

  deleteExercise(exercise: ExerciseDelete): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: exercise.id
      }
    }
    return this.http.delete<ApiResponse>('exercises', options)
      .pipe(map(result => {
        return result as ApiResponse
      }))
  }
}
