import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent {
  @Input() label = 'Edit';
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  output(event: any) {
    this.onClick.emit(event);
  }
}
