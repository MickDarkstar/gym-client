import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss']
})
export class ConfirmButtonComponent {
  @Input() label: string;
  @Input() confirmMessage: string;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClick = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  openConfirmDialog(event: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: this.confirmMessage ? this.confirmMessage : 'Are you sure?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.output(result)
      }
    });
  }

  private output(result: boolean) {
    this.onClick.emit(result);
  }
}
