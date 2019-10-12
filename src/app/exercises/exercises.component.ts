import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../shared/models/exercises/exercise.model';
import { Router } from '@angular/router';
import { ExerciseService } from '../shared/services/exercise.service';
import { ExerciseDelete } from '../shared/models/exercises/exercise-delete.model';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})

export class ExercisesComponent implements OnInit {
  dataSource: Exercise[]

  constructor(
    private router: Router,
    private exerciseService: ExerciseService

  ) { }

  ngOnInit() {
    this.exerciseService.exercises
      .subscribe(result => {
        this.dataSource = result
      })
  }

  edit(exercise: Exercise) {
    this.router.navigate(['training/edit-exercise'], { state: { data: exercise } })
  }

  delete(exercise: Exercise) {
    this.exerciseService.deleteExercise(exercise as ExerciseDelete)
      .subscribe(success => {
        if (success) {
          this.removeExerciseFromLocalDataSource(exercise)
        }
      })
  }

  private removeExerciseFromLocalDataSource(deletedExercise: Exercise) {
    this.dataSource = this.dataSource.filter(x => x.id !== deletedExercise.id)
  }
}
