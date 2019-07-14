import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Entry } from 'src/app/shared/models/entry.model';
import { EntryDetail } from 'src/app/shared/models/entry-detail.model';

@Component({
  selector: 'app-current-entry',
  templateUrl: './current-entry.component.html',
  styleUrls: ['./current-entry.component.scss']
})
export class CurrentEntryComponent implements OnInit {
  currentEntry: Entry
  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.getCurrentEntry().subscribe(result => {
      this.currentEntry = result
    })
  }

  saveEntryDetail(entryDetail: EntryDetail) {
    this.workoutService.saveEntryDetail(entryDetail).subscribe(() => {
      console.log('Entry detail saved')
    })
  }

  saveEntry(entry: Entry) {
    this.workoutService.saveEntry(entry).subscribe(() => {
      console.log('Entry saved')
    })
  }
}
