import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SpecialistsTableSearchComponentComponent } from '../specialists-table-search-component/specialists-table-search-component.component';
import { CustomCalendarComponentComponent } from '../custom-calendar-component/custom-calendar-component.component';
import { NgFor, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Service, Services } from '../../../../core/services/MedicalCare/services.service';
import { DoctorHoursService, DoctorHourCreate } from '../../../../core/services/clinical-management/doctors-hours.service';

@Component({
  selector: 'app-programming-calendar-component',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, MatDialogModule, SpecialistsTableSearchComponentComponent, CustomCalendarComponentComponent],
  templateUrl: './programming-calendar-component.component.html',
  styleUrls: ['./programming-calendar-component.component.css']
})
export class ProgrammingCalendarComponentComponent implements OnInit {
  specialistSchedule = [];
  selectedPerson: any = null;
  additionalSelectedDates: string[] = [];
  isModalVisible = false;
  selectedDate: Date = new Date();
  form: FormGroup;
  services: Service[] = [];
  onWait: boolean = false;

  constructor(
    private fb: FormBuilder,
    private servicesService: Services,
    private doctorHoursService: DoctorHoursService
  ) {
    this.form = this.fb.group({
      servicio: [null, Validators.required],
      horaInicio: [null, Validators.required],
      horaFinal: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Componente ProgrammingCalendarComponent inicializado');
    this.fetchSpecialistSchedules();
    this.loadServices();
  }

  async loadServices() {
    this.onWait = true;
    try {
      this.services = await this.servicesService.getDates();
      console.log('Servicios cargados:', this.services);
    } catch (error) {
      console.error('Error al cargar los servicios:', error);
    } finally {
      this.onWait = false;
    }
  }

  fetchSpecialistSchedules(): void { }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  onDateChange(date: Date): void {
    const formattedDate = this.formatDate(date);
    console.log('Fecha cambiada:', formattedDate);
    this.selectedDate = date;
  }

  handleSelectSpecialist(specialist: any): void {
    console.log('Especialista seleccionado:', specialist);
    this.selectedPerson = specialist;
    this.additionalSelectedDates = [];
  }

  handleDayClick(date: Date): void {
    const formattedDate = this.formatDate(date);
    console.log('Día clickeado:', formattedDate);

    if (this.additionalSelectedDates.includes(formattedDate)) {
      this.additionalSelectedDates = this.additionalSelectedDates.filter(d => d !== formattedDate);
      console.log('Fecha eliminada:', formattedDate);
    } else {
      this.additionalSelectedDates.push(formattedDate);
      console.log('Fecha agregada:', formattedDate);
    }

    console.log('Fechas adicionales seleccionadas:', this.additionalSelectedDates);
  }

  showModal(): void {
    if (this.selectedPerson) {
      console.log('Mostrando modal de programación');
      this.isModalVisible = true;
    } else {
      console.log('No se ha seleccionado un doctor.');
    }
  }

  async handleOk() {
    if (this.form.invalid) return;

    const { servicio, horaInicio, horaFinal } = this.form.value;

    // Estructura de datos para enviar al backend como `DoctorHourCreate`
    const dataToSend: DoctorHourCreate = {
      personaId: this.selectedPerson?.id || null,
      serviceId: servicio,
      fechas: this.additionalSelectedDates,
      startTime: horaInicio,
      endTime: horaFinal,
    };

    console.log('Datos a enviar:', dataToSend);

    try {
      // Usar el servicio `DoctorHoursService` para enviar los datos
      await this.doctorHoursService.createDoctorHour(dataToSend);
      console.log('Horario creado exitosamente');
      this.handleCreateSuccess();
    } catch (error) {
      console.error('Error al crear el horario:', error);
    }

    this.isModalVisible = false;
    this.form.reset();
  }

  handleCreateSuccess(): void {
    console.log('Programación creada exitosamente');
    this.isModalVisible = false;
    this.fetchSpecialistSchedules();
  }

  cancel(): void {
    this.isModalVisible = false;
  }
}
