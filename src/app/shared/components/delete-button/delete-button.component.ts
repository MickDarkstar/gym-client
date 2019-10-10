import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  label = 'Remove';
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClick = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  openConfirmDialog(event: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
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
