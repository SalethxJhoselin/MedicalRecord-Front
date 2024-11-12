import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AttentionQuotasService } from '../../../core/services/MedicalCare/attention-quotas.service';
import { InsuredService, InsuredGet } from '../../../core/services/clinical-management/insureds.service';
import { FormsModule } from '@angular/forms';
import { TriajeRecordService, TriageRequest } from '../../../core/services/clinical-management/triaje-record.service';

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
  insuredData: { [id: number]: InsuredGet } = {};
  currentInsuredName: string = '';
  currentServiceName: string = '';
  currentReservationId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private attentionQuotasService: AttentionQuotasService,
    private insuredService: InsuredService,
    private triajeRecordService: TriajeRecordService
  ) {
    this.triajeForm = this.fb.group({
      fechaTriaje: ['', Validators.required],
      presionArterial: ['', Validators.required],
      frecuenciaCardiaca: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      temperatura: ['', [Validators.required, Validators.min(30), Validators.max(45)]],
      oxigeno: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      sintomas: ['', Validators.required],
      comentario: ['', Validators.required],
      prioridad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  async loadReservations() {
    try {
      this.reservations = await this.attentionQuotasService.getReservations();
      console.log('Datos de reservas cargados:', this.reservations);
      this.loadInsuredData();
    } catch (error) {
      console.error('Error al cargar los datos de reservas:', error);
    }
  }

  async loadInsuredData() {
    const insuredIds = [...new Set(this.reservations.map(reservation => reservation.asegurado.id))];
    for (const id of insuredIds) {
      try {
        this.insuredData[id] = await this.insuredService.getInsuredById(id);
      } catch (error) {
        console.error(`Error al cargar datos del asegurado con ID ${id}:`, error);
      }
    }
    console.log('Datos de asegurados cargados:', this.insuredData);
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

  openModal(reservationId: number) {
    const reservation = this.reservations.find(res => res.id === reservationId);
    if (reservation) {
      this.currentReservationId = reservationId;
      this.currentInsuredName = this.insuredData[reservation.asegurado.id]?.nombre || 'Nombre no disponible';
      this.currentServiceName = reservation.service.nombre;

      const fechaTriaje = `${reservation.fecha[0]}-${String(reservation.fecha[1]).padStart(2, '0')}-${String(reservation.fecha[2]).padStart(2, '0')} ${String(reservation.horaReserva[0]).padStart(2, '0')}:${String(reservation.horaReserva[1]).padStart(2, '0')}`;
      this.triajeForm.patchValue({ fechaTriaje });

      this.isModalVisible = true;
    }
  }

  closeModal() {
    this.isModalVisible = false;
    this.triajeForm.reset();
    this.currentReservationId = null;
  }

  async onOtherButtonClick(): Promise<void> {
    // if (this.triajeForm.valid) {
    const fechaOriginal = this.triajeForm.value.fechaTriaje;

    // Convertir la fecha al formato día-mes-año
    const [fecha, hora] = fechaOriginal.split(' ');
    const [year, month, day] = fecha.split('-');
    const fechaFormateada = `${day}-${month}-${year} ${hora}`;
    const triajeData = {
      reservaId: this.currentReservationId,
      fechaTriaje: fechaFormateada,
      presionArterial: String(this.triajeForm.value.presionArterial),
      frecuenciaCardiaca: Number(this.triajeForm.value.frecuenciaCardiaca),
      temperatura: Number(this.triajeForm.value.temperatura),
      oxigeno: Number(this.triajeForm.value.oxigeno),
      sintomas: this.triajeForm.value.sintomas,
      comentario: this.triajeForm.value.comentario,
      prioridad: Number(this.triajeForm.value.prioridad)
    };
    console.log('registro de triaje para enviar:', triajeData);
    try {
      const response = await this.triajeRecordService.createTriage(triajeData);
      console.log('registrado OK:', response);
      this.closeModal();
    } catch (error) {
      console.error('Error al registrar triaje:', error);
    }
    /*} else {
      console.log('Formulario inválido');
    }*/
  }


}
