import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EntryDetail } from 'src/app/shared/models/entry-detail.model';

@Component({
  selector: 'app-entry-detail-edit',
  templateUrl: './entry-detail-edit.component.html',
  styleUrls: ['./entry-detail-edit.component.scss']
})
export class EntryDetailEditComponent implements OnInit {
  @Input() entryDetail: EntryDetail
  @Output() output = new EventEmitter()
  public entryDetailToSave: EntryDetail = null
  constructor() { }

  ngOnInit() {
    this.entryDetailToSave = this.entryDetail
  }

  save() {
    this.entryDetail.done = true
    this.output.emit(this.entryDetailToSave)
  }
}
