import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  @Input() exercise: Exercise
  constructor() { }

  ngOnInit() {
  }
}
