import { Component, Input, Output, EventEmitter } from '@angular/core';
//import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-custom-calendar-component',
  standalone: true,
  imports: [],
  templateUrl: './custom-calendar-component.component.html',
  styleUrl: './custom-calendar-component.component.css'
})
export class CustomCalendarComponentComponent {
  @Input() value!: Date;
  @Input() tileClassName!: (args: any) => string;
  @Input() tileContent!: (args: any) => string;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() dayClick = new EventEmitter<Date>();

  today = new Date();

  handleDateChange(event: any): void {
    this.dateChange.emit(event.value);
  }

  onClickDay(date: Date): void {
    this.dayClick.emit(date);
  }
}
