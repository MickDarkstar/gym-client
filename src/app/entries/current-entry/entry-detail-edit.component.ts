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
  public done = false
  public entryDetailToSave: EntryDetail = null
  constructor() { }

  ngOnInit() {
    this.entryDetailToSave = this.entryDetail
  }

  save() {
    this.output.emit(this.entryDetailToSave)
    this.done = true
  }
}
