import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  public exercise: Exercise
  constructor() { }

  ngOnInit() {
    this.exercise = new Exercise()
  }

  save() {
    alert(this.exercise.name)
  }
}
