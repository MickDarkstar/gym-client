import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EntryDetail } from 'src/app/shared/models/entry-detail.model';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-entry-detail-edit',
  templateUrl: './entry-detail-edit.component.html',
  styleUrls: ['./entry-detail-edit.component.scss']
})
export class EntryDetailEditComponent implements OnInit {
  @Input() entryDetail: EntryDetail
  @Output() output = new EventEmitter()
  public entryDetailToSave: EntryDetail = null

  constructor(
    private workoutService: WorkoutService
  ) { }

  ngOnInit() {
    this.entryDetailToSave = this.entryDetail
  }

  save() {
    this.entryDetail.date = new Date();
    this.output.emit(this.entryDetailToSave)
  }

  uncheckAndSave() {
    this.entryDetail.date = null;
    this.output.emit(this.entryDetailToSave)
  }

  remove() {
    this.workoutService.deleteEntryDetail(this.entryDetail)
  }
}
