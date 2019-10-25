import { Component, OnInit } from '@angular/core';
import { Exercise } from '@src/app/shared/models/exercises/exercise.model';
import { WorkoutService } from '@src/app/shared/services/workout.service';
import { ExerciseService } from '@src/app/shared/services/exercise.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  exercises: Exercise[]

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.exerciseService.exercises.subscribe(exercises => {
      this.exercises = exercises
    })
  }

  addExercise(exercise: Exercise) {
    this.workoutService.createEntryDetail(exercise)
  }
}
