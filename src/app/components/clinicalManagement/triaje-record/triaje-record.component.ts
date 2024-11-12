import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AttentionQuotasService } from '../../../core/services/MedicalCare/attention-quotas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-triaje-record',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './triaje-record.component.html',
  styleUrls: ['./triaje-record.component.css']
})
export class TriajeRecordComponent implements OnInit {
  Object = Object;
  triajeForm: FormGroup;
  isModalVisible: boolean = false;
  reservations: any[] = [];
  filteredReservationsByService: { [serviceName: string]: any[] } = {};
  selectedDate: string = '';

  constructor(
    private fb: FormBuilder,
    private attentionQuotasService: AttentionQuotasService
  ) {
    this.triajeForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      sexo: ['', Validators.required],
      temperatura: ['', [Validators.required, Validators.min(30), Validators.max(45)]],
      frecuenciaCardiaca: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      frecuenciaRespiratoria: ['', [Validators.required, Validators.min(10), Validators.max(40)]],
      presionArterial: ['', Validators.required],
      saturacionOxigeno: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      nivelConciencia: ['', Validators.required],
      quejaPrincipal: ['', Validators.required],
      nivelUrgencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  async loadReservations() {
    try {
      this.reservations = await this.attentionQuotasService.getReservations();
      console.log('Datos de reservas cargados:', this.reservations);
    } catch (error) {
      console.error('Error al cargar los datos de reservas:', error);
    }
  }

  onDateChange(date: string) {
    console.log('Fecha seleccionada:', date);
    this.selectedDate = date;
    this.groupReservationsByService(date);
  }

  groupReservationsByService(date: string) {
    const filteredByDate = this.reservations.filter(reservation => {
      const reservationDate = `${reservation.fecha[0]}-${String(reservation.fecha[1]).padStart(2, '0')}-${String(reservation.fecha[2]).padStart(2, '0')}`;
      return reservationDate === date;
    });

    this.filteredReservationsByService = filteredByDate.reduce((groups, reservation) => {
      const serviceName = reservation.service.nombre.trim();
      if (!groups[serviceName]) {
        groups[serviceName] = [];
      }
      groups[serviceName].push(reservation);
      return groups;
    }, {});
    
    console.log('Reservas agrupadas por servicio:', this.filteredReservationsByService);
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.triajeForm.reset();
  }

  onSubmit() {
    if (this.triajeForm.valid) {
      const triajeData = this.triajeForm.value;
      console.log('Datos del Triaje:', triajeData);
      this.closeModal();
    } else {
      console.log('Formulario inválido');
    }
  }
}
