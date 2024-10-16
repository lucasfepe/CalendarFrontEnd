import { ChangeDetectionStrategy, Component, inject, signal, model, Input } from '@angular/core';
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
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
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
    ReactiveFormsModule
  ],
})
export class DialogOverviewExampleDialog {
  @Input() calendar: FullCalendarComponent | undefined = undefined;

  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);

  newEventForm = new FormGroup({
    title: new FormControl(''),
    location: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleSubmit() {
    var dateIn = new Date(this.newEventForm.value.date ?? '');
    var dateInstart = new Date(this.newEventForm.value.date ?? '');
    var dateInend = new Date(this.newEventForm.value.date ?? '');
    dateInstart.setHours((new Date("1970-01-01T" + this.newEventForm.value.startTime)).getHours());
    dateInend.setHours((new Date("1970-01-01T" + this.newEventForm.value.endTime)).getHours());
    var dateStr = dateIn.toLocaleString('en-CA', { timeZone: 'America/Edmonton', hour12: false }).split(',')[0];
    var startDate = dateInstart.toLocaleString('en-CA', { timeZone: 'America/Edmonton', hour12: false }).replace(',', '');
    var endDate = dateInend.toLocaleString('en-CA', { timeZone: 'America/Edmonton', hour12: false }).replace(',', '');
    this.calendar!.getApi().addEvent({
      title: this.newEventForm.value.title ?? '',
      date: dateStr,
      start: startDate,
      end: endDate,
      color: 'purple',
      location: this.newEventForm.value.location,
    });
    this.dialogRef.close();
  }
}
