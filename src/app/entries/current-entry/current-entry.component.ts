import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Entry } from 'src/app/shared/models/entry.model';

@Component({
  selector: 'app-current-entry',
  templateUrl: './current-entry.component.html',
  styleUrls: ['./current-entry.component.scss']
})
export class CurrentEntryComponent implements OnInit {
  currentEntry: Entry
  value = 'Clear me';
  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.getCurrentEntry().subscribe(result => {
      this.currentEntry = result
    })
  }
}
