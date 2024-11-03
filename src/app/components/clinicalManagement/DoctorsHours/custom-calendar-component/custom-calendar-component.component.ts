import { ChangeDetectionStrategy, Component, model, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-custom-calendar-component',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-calendar-component.component.html',
  styleUrl: './custom-calendar-component.component.css',

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
