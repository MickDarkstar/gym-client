import { Component, OnInit } from '@angular/core';
import { Exercise } from '../shared/models/exercise.model';
import { HttpClient } from '@angular/common/http';
import { WorkoutService } from '../shared/services/workout.service';
import { ApiResponse } from '../shared/models/api-response.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})

export class ExercisesComponent implements OnInit {
  exercises: Exercise[]

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    // Todo: put in service
    this.http.get<ApiResponse>('exercises')
      .pipe(map(result => {
        this.exercises = result.data
      }))
      .subscribe()
  }

  edit(exercise: Exercise) {
    this.router.navigate(['training/edit-exercise'], { state: { data: exercise } })
  }

  delete(exercise: Exercise) {
    // Todo: implement
  }
}
