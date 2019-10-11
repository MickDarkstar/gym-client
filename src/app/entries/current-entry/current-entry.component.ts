import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Entry } from 'src/app/shared/models/entry.model';
import { EntryDetail } from 'src/app/shared/models/entry-detail.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-entry',
  templateUrl: './current-entry.component.html',
  styleUrls: ['./current-entry.component.scss']
})
export class CurrentEntryComponent implements OnInit {
  currentEntry: Entry
  unplanned: boolean

  constructor(
    private workoutService: WorkoutService
  ) { }

  ngOnInit() {
    this.workoutService.entry
      .subscribe(result => {
        if (result) {
          this.currentEntry = result
        }
        this.unplanned = (result && result.entryDetails && result.entryDetails.length > 0) ? false : true;
      })
    this.workoutService.loadCurrentEntry()
  }

  updateEntryDetail(entryDetail: EntryDetail) {
    this.workoutService.updateEntryDetail(entryDetail)
      .pipe(take(1))
      .subscribe((success) => {
        if (success) {
          const entryIndex = this.currentEntry.entryDetails.findIndex(entry => entry.id === entryDetail.id)
          this.currentEntry.entryDetails.splice(entryIndex, 1, entryDetail)
        }
      })
  }
}
