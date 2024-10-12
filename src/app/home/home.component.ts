import { Component, inject, ViewChild } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExample } from '../new-event-dialog/new-event-dialog.component';
import { LegendComponent } from '../legend/legend.component';


@Component({
	selector: 'app-home',
	standalone: true,
	imports: [HousingLocationComponent, CommonModule,
		FullCalendarModule, MatSlideToggleModule, DialogOverviewExample, LegendComponent],
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
	@ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
	dialog: DialogOverviewExample = new DialogOverviewExample();
	calendarOptions: CalendarOptions = {
		headerToolbar: {
			left: 'prev,next today addEventButton',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},
		customButtons: {

			addEventButton: {
				text: 'add event...',
				click: () => this.dialog.openDialog()
			}
		},
		initialView: 'timeGridWeek',
		weekends: true,
		plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
		dateClick: (arg) => this.handleDateClick(arg),
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
				color: 'red'
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