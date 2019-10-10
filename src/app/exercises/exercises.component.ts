import { Component, OnInit } from '@angular/core';
import { Exercise } from '../shared/models/exercises/exercise.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ExerciseService } from '../shared/services/exercise.service';
import { ExerciseDelete } from '../shared/models/exercises/exercise-delete.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})

export class ExercisesComponent implements OnInit {
  dataSource: Exercise[]

  constructor(
    private router: Router,
    private exerciseService: ExerciseService,
    private toast: ToastrService

  ) { }

  ngOnInit() {
    this.exerciseService.allExercises()
      .pipe(map(exercises => {
        this.dataSource = exercises
      }))
      .subscribe()
  }

  edit(exercise: Exercise) {
    this.router.navigate(['training/edit-exercise'], { state: { data: exercise } })
  }

  delete(exercise: Exercise) {
    this.exerciseService.deleteExercise(exercise as ExerciseDelete)
      .pipe(map(result => {
        if (result) {
          this.toast.success(result.message)
        }
        if (result.data === true) {
          this.removeExerciseFromLocalDataSource(exercise)
        }
      }))
      .subscribe()
  }

  private removeExerciseFromLocalDataSource(deletedExercise: Exercise) {
    this.dataSource = this.dataSource.filter(x => x.id !== deletedExercise.id)
  }
}
