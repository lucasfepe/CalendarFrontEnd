import { ChangeDetectionStrategy, Component, inject, signal, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../dialog-data';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOverviewExample {
  readonly location = signal('');
  readonly title = '';
  readonly date = '';
  readonly startTime = '';
  readonly endTime = '';
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        title: this.title,
        location: this.location(),
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.location.set(result);
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDatepickerModule,
    MatDialogTitle,

  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly location = model(this.data.location);
  readonly title = model(this.data.title);
  readonly date = model(this.data.date);
  readonly startTime = model(this.data.startTime);
  readonly endTime = model(this.data.endTime);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
