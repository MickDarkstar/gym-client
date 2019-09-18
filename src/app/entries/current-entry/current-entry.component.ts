import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Entry } from 'src/app/shared/models/entry.model';
import { EntryDetail } from 'src/app/shared/models/entry-detail.model';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-current-entry',
  templateUrl: './current-entry.component.html',
  styleUrls: ['./current-entry.component.scss']
})
export class CurrentEntryComponent implements OnInit {
  currentEntry: Entry
  constructor(private workoutService: WorkoutService, private toast: ToastrService) { }

  ngOnInit() {
    this.workoutService.getCurrentEntry()
      .pipe(take(1))
      .subscribe(result => {
        this.currentEntry = result
      })
  }

  updateEntryDetail(entryDetail: EntryDetail) {
    this.workoutService.updateEntryDetail(entryDetail)
      .pipe(take(1))
      .subscribe(() => {
        this.toast.success('Nice work hero!', 'Exercise completed')
      })
  }
}
