import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IApiResponse } from '../models/api-response.model';
import { Exercise } from '../models/exercises/exercise.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ExerciseDelete } from '../models/exercises/exercise-delete.model';
import { ExerciseCreate } from '../models/exercises/exercise-create.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exercises: BehaviorSubject<Exercise[]> = new BehaviorSubject(null)

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {
    this.loadAllExercises()
  }

  loadAllExercises() {
    this.http.get<IApiResponse>('exercises')
      .subscribe(
        result => {
          if (result && result.data) {
            const exercises = result.data as Exercise[]
            this.exercises.next(exercises)
          } else {
            this.showErrorMessage()
          }
        },
        err => {
          console.log(err)
          this.toast.warning(err)
          this.toast.warning("ta bort error message i ExerciseService vid result")
          this.showErrorMessage()
        }
      )
  }

  private showErrorMessage() {
    this.toast.error('Woops! Something went wrong')
  }

  createExercise(exercise: ExerciseCreate): Observable<boolean> {
    return this.http.post<IApiResponse>('exercises', exercise)
      .pipe(map(result => {
        if (result.data) {
          this.toast.success(result.message)
          return true
        }
        this.toast.warning(result.message)
        return false
      }))
  }

  editExercise(exercise: Exercise): Observable<boolean> {
    return this.http.put<IApiResponse>('exercises', exercise)
      .pipe(map(result => {
        if (result.data) {
          this.toast.success(result.message)
          return true
        }
        this.toast.warning(result.message)
        return false
      })
      )
  }

  deleteExercise(exercise: ExerciseDelete): Observable<boolean> {
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
        if (result && result.data) {
          this.toast.success(result.message)
          return true
        }
        this.toast.warning(result.message)
        return false
      }))
  }
}
