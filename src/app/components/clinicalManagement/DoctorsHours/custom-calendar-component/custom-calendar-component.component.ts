import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter } from '@angular/core';
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
  styleUrls: ['./custom-calendar-component.component.css'],
})
export class CustomCalendarComponentComponent {
  @Input() value!: Date;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() dayClick = new EventEmitter<Date>();

  selectedDates: string[] = []; // Array para almacenar fechas en formato "dd-mm-yyyy"

  constructor(private cdr: ChangeDetectorRef) {}

  // Función para convertir una fecha en formato "dd-mm-yyyy"
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  handleDateChange(event: any): void {
    this.dateChange.emit(event.value);
  }

  onClickDay(date: Date): void {
    const formattedDate = this.formatDate(date); // Convertir la fecha a "dd-mm-yyyy"
    console.log("Fecha formateada a comparar:", formattedDate); // Mostrar la fecha formateada
    console.log("Array de fechas seleccionadas antes:", this.selectedDates); // Mostrar el array antes de cambiarlo

    const selectedIndex = this.selectedDates.indexOf(formattedDate);

    if (selectedIndex === -1) {
      // Agregar la fecha si no está en el array
      this.selectedDates.push(formattedDate);
      console.log("Fecha agregada:", formattedDate); // Log cuando se agrega la fecha
    } else {
      // Eliminar la fecha si ya está en el array
      this.selectedDates.splice(selectedIndex, 1);
      console.log("Fecha eliminada:", formattedDate); // Log cuando se elimina la fecha
    }

    console.log("Array de fechas seleccionadas después:", this.selectedDates,"*--------------------------------------------------------------"); // Mostrar el array después de cambiarlo

    // Emitir el cambio de fecha y forzar detección de cambios
    this.dayClick.emit(date);
    this.cdr.detectChanges();
  }

  dateClass = (d: Date) => {
    // Verificar si la fecha en formato "dd-mm-yyyy" está en selectedDates
    const formattedDate = this.formatDate(d);
    return this.selectedDates.includes(formattedDate) ? 'selected-date' : '';
  };
}
