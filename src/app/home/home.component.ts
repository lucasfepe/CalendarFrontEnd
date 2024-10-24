import { Component, inject, ViewChild } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../new-event-dialog/new-event-dialog.component';
import { LegendComponent } from '../legend/legend.component';
import { MeetupEvent } from '../meetupevent';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { ImplicitLoginService } from '../implicit-login.service';


@Component({
	selector: 'app-home',
	standalone: true,
	imports: [HousingLocationComponent, CommonModule,
		FullCalendarModule, MatSlideToggleModule, LegendComponent],
	template: `

    <section>
			<app-legend></app-legend>
      <full-calendar 
        #calendar
        [options]="calendarOptions">
        <!-- <ng-template #eventContent let-arg>
          <b>{{ arg.event.title }}</b>
          {{ arg.event.start | date: 'shortTime'}} - 
          {{ arg.event.end | date: 'shortTime'}}
        </ng-template> -->
      </full-calendar>
    </section>
  `,
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	readonly dialog = inject(MatDialog);
	@ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
	readonly implicitLoginService: ImplicitLoginService = inject(ImplicitLoginService);
	testEvent: MeetupEvent = {
		id: 1,
		location: 'My house',
		title: 'Test Event',
		date: new Date(),
		startTime: new Date(),
		endTime: new Date()

	}

	calendarOptions: CalendarOptions = {
		headerToolbar: {
			left: 'prev,next today addEventButton',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},
		customButtons: {

			addEventButton: {
				text: 'add event...',
				click: () => this.openDialog()
			}
		},
		initialView: 'timeGridWeek',
		weekends: true,
		plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
		dateClick: (arg) => this.handleDateClick(arg),
		eventClick: (arg: EventClickArg) => this.eventDetails(arg),
		select: function (info) {
			alert('selected ' + info.startStr + ' to ' + info.endStr);
		},
		eventDisplay: 'block',
		selectable: true,
		// eventOverlap: false,
		slotEventOverlap: false,
		// displayEventTime:true,
		// displayEventEnd: true,
		events: [
			{
				title: 'event 3', date: '2024-10-09', start: '2024-10-09 10:00:00', end: '2024-10-09 12:00:00',
				color: 'red', location: 'you mom\'s house'
			},
			{
				title: 'event 4', date: '2024-10-09', start: '2024-10-09 10:00:00', end: '2024-10-09 11:00:00',
				color: 'green'
			},
			{
				title: 'event 5', date: '2024-10-09', start: '2024-10-09 09:00:00', end: '2024-10-09 17:00:00'
			}
		]

	};
	login(): void {
		var res = this.implicitLoginService.login();
	}
	ngOnInit() {

		this.login();

	}
	eventDetails(arg: EventClickArg): void {

		const dialogRef = this.dialog.open(EventDetailsComponent, {

			disableClose: false
		});
		const ha: Date = arg.event.start as Date;
		const eventDetails: MeetupEvent = {
			id: arg.event.extendedProps['id'] ?? 1,
			title: arg.event.title,
			location: arg.event.extendedProps['location'],
			date: arg.event.start as Date,
			startTime: arg.event.start as Date,
			endTime: arg.event.end as Date
		}
		dialogRef.componentInstance.event = eventDetails;

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');

		});
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {

			disableClose: true
		});
		dialogRef.componentInstance.calendar = this!.calendarComponent;

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');

		});
	}
	someFunction() {
		let calendarApi = this.calendarComponent!.getApi();
		calendarApi.next();
	}

	eventsPromise: Promise<EventInput[]> | undefined;
	handleDateClick(arg: DateClickArg) {
		alert('date click! ' + arg.dateStr)
	}
	housingService = inject(HousingService);
	housingLocationList: HousingLocation[] = [];
	filteredLocationList: HousingLocation[] = [];
	constructor() {
		this.housingService.getAllHousingLocations()
			.then((housingLocationList: HousingLocation[]) => {
				this.housingLocationList = housingLocationList;
				this.filteredLocationList = housingLocationList;
			});
	}
	filterResults(text: string) {
		if (!text) {
			this.filteredLocationList = this.housingLocationList;
			return;
		}
		this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
			housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
		);
	}
	toggleWeekends() {
		this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
	}
}