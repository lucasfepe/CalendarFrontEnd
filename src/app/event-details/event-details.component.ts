import { Component, inject, Input } from '@angular/core';
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
import { MeetupEvent } from '../meetupevent'

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  @Input({ required: true }) event!: MeetupEvent;
  readonly dialogRef = inject(MatDialogRef<EventDetailsComponent>);
  onNoClick(): void {
    this.dialogRef.close();
  }
}
