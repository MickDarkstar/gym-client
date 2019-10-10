import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Exercise } from '../shared/models/exercises/exercise.model';
import { WorkoutService } from '../shared/services/workout.service';
import { ExerciseService } from '../shared/services/exercise.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  dataSource: Exercise[]

  constructor(
    private authService: AuthService,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    // Todo: arbeta bort, redirect sker i auth-interceptor om användare ej är inloggad.
    if (this.authService.isLoggedIn()) {
      this.exerciseService.allExercises()
        .pipe(map(exercises => {
          this.dataSource = exercises
        }))
        .subscribe()
    }
  }

  addExercise(exercise: Exercise) {
    this.workoutService.createEntryDetail(exercise)
  }
}
