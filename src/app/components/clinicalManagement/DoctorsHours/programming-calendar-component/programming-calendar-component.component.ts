import { Component } from '@angular/core';
import { SpecialistsTableSearchComponentComponent } from '../specialists-table-search-component/specialists-table-search-component.component';
import { CustomCalendarComponentComponent } from '../custom-calendar-component/custom-calendar-component.component';


@Component({
  selector: 'app-programming-calendar-component',
  standalone: true,
  imports: [SpecialistsTableSearchComponentComponent, CustomCalendarComponentComponent],
  templateUrl: './programming-calendar-component.component.html',
  styleUrl: './programming-calendar-component.component.css'
})
export class ProgrammingCalendarComponentComponent {

}
