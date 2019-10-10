import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { ExerciseCreate } from 'src/app/shared/models/exercises/exercise-create.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  public exercise: ExerciseCreate

  constructor(
    private exerciseService: ExerciseService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.initNewExercise()
  }

  save() {
    this.exerciseService.createExercise(this.exercise)
      .subscribe((result) => {
        if (result) {
          this.toast.success(result.message)
        }
        // Todo: lägg till ok-flagga istället för att kontrollera boolean-värdet på data
        // Todo: Fixa detta i api:et också.
        if (result.data === true) {
          this.initNewExercise()
        }
      })
  }

  initNewExercise() {
    this.exercise = new ExerciseCreate()
    this.exercise.muscleId = 0
  }
}
