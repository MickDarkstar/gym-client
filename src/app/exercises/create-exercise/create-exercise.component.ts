import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ExerciseCreate } from 'src/app/shared/models/exercises/exercise-create.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-exercise',
  templateUrl: '../create-edit-exercise.component.html',
  styleUrls: ['../create-edit-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  public exercise: ExerciseCreate
  title = 'Create Exercise'

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initNewExercise()
  }

  save() {
    this.exerciseService.createExercise(this.exercise)
      .subscribe((result) => {
        // Todo: lägg till ok-flagga istället för att kontrollera boolean-värdet på data
        // Todo: Fixa detta i api:et också.
        if (result.data === true) {
          this.initNewExercise()
        }
      })
  }

  cancel() {
    this.router.navigate(['training/exercises'])
  }

  initNewExercise() {
    this.exercise = new ExerciseCreate()
    this.exercise.muscleId = 0
  }
}
