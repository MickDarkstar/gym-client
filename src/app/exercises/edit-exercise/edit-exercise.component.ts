import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { browser } from 'protractor';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  private state: Observable<Exercise>;
  exercise: Exercise

  constructor(
    public activatedRoute: ActivatedRoute,
    // private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.state = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.data
      ))
    this.state
      .pipe(take(1))
      .subscribe((exercise: Exercise) => {
        this.exercise = exercise
      })
  }

  save() {
    // "id": "4",
    // "muscleId": "1",
    // "name": "Benchpress - 0 degree",
    // "type": "Benchpress",
    // "level": "200"
    // this.http.put<ApiResponse>('exercises')
    //   .pipe(map(result => {
    //     this.exercises = result.data
    //   }))
    //   .subscribe()
  }
}
