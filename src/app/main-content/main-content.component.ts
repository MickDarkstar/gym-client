import { Component, OnInit } from '@angular/core';
import { Exercise } from '../shared/models/exercises/exercise.model';
import { WorkoutService } from '../shared/services/workout.service';
import { ExerciseService } from '../shared/services/exercise.service';

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
