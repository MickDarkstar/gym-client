import { Component, OnInit, Input } from '@angular/core';
import { Exercise, IExercise } from 'src/app/shared/models/exercises/exercise.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: '../create-edit-exercise.component.html',
  styleUrls: ['../create-edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  private state: Observable<Exercise>;
  exercise: Exercise
  title = 'Edit Exercise'

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.state = this.activatedRoute.paramMap
      .pipe(map(() =>
        this.exercise = window.history.state.data as Exercise
      ))
    this.state
      .pipe(take(1))
      .subscribe((exercise: IExercise) => {
        this.exercise = exercise
      })
  }

  save() {
    this.exerciseService.editExercise(this.exercise)
      .subscribe((success) => {
        if (success === true) {
          this.redirectToExercises()
        }
      })
  }

  cancel() {
    this.redirectToExercises()
  }

  redirectToExercises() {
    this.router.navigate(['training/exercises'])
  }
}
