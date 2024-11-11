import { Component, OnInit } from '@angular/core';
import { DoctorHoursService, DoctorHour } from '../../../core/services/clinical-management/doctors-hours.service';
import { InsuredService, InsuredGet } from '../../../core/services/clinical-management/insureds.service';
import { AttentionQuotasService, ReservationCreate } from '../../../core/services/MedicalCare/attention-quotas.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attention-quotas',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './attention-quotas.component.html',
  styleUrls: ['./attention-quotas.component.css']
})
export class AttentionQuotasComponent implements OnInit {
  doctorHours: DoctorHour[] = [];
  insuredList: InsuredGet[] = [];
  selectedQuotas: string[] = [];
  isModalVisible = false;
  selectedQuota: string | null = null;
  selectedInsured: string | null = null;
  reservationDate: string = ''; // Fecha de reserva en formato "YYYY-MM-DD"
  reservationStatus: string = 'Pendiente';
  reservationComment: string = '';
  selectedDate: string = ''; // Fecha seleccionada en formato "YYYY-MM-DD"

  constructor(
    private doctorHoursService: DoctorHoursService,
    private insuredService: InsuredService,
    private attentionQuotasService: AttentionQuotasService
  ) { }

  ngOnInit(): void {
    this.loadDoctorHours();
    this.loadInsureds();
  }

  async loadDoctorHours() {
    try {
      this.doctorHours = await this.doctorHoursService.getDoctorHours();
      console.log('Horarios de médicos cargados:', this.doctorHours);
    } catch (error) {
      console.error('Error al cargar los horarios de los médicos:', error);
    }
  }

  async loadInsureds() {
    try {
      this.insuredList = await this.insuredService.getInsureds();
      console.log('Asegurados cargados:', this.insuredList);
    } catch (error) {
      console.error('Error al cargar los asegurados:', error);
    }
  }

  // Función para formatear el tiempo de inicio y fin
  formatTime(time: string): string {
    return time;
  }

  // Generar cupos en función de la duración del servicio y el horario seleccionado
  generateQuotas(hour: DoctorHour): void {
    const startTime = hour.horarios[0].startTime;
    const endTime = hour.horarios[0].endTime;
    const duration = hour.horarios[0].service.duracion;

    let [currentHour, currentMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    this.selectedQuotas = [];

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const formattedTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
      this.selectedQuotas.push(formattedTime);

      currentMinute += duration;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }
  }

  // Mostrar horarios disponibles para la fecha seleccionada
  filterDoctorHoursByDate(): DoctorHour[] {
    return this.doctorHours.filter((hour) =>
      hour.horarios.some((horario) => horario.fechas.includes(this.selectedDate))
    );
  }

  openReservationModal(quota: string): void {
    this.selectedQuota = quota;
    this.isModalVisible = true;
  }

  async confirmReservation(): Promise<void> {
    const reservationData: ReservationCreate = {
      personaId: this.selectedInsured ? parseInt(this.selectedInsured) : 0,
      serviceId: this.doctorHours[0].horarios[0].service.id, // ID de servicio del horario seleccionado
      horaReserva: this.selectedQuota || '',
      fecha: this.selectedDate,
      estado: this.reservationStatus,
      comentario: this.reservationComment,
      aseguradoId: this.selectedInsured ? parseInt(this.selectedInsured) : 0
    };

    try {
      console.log('Reserva creada exitosamente:', reservationData);
      await this.attentionQuotasService.createReservation(reservationData);
      console.log('Reserva creada exitosamente:', reservationData);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }

    this.isModalVisible = false;
    this.selectedQuota = null;
    this.selectedInsured = null;
    this.reservationComment = '';
  }

  cancelReservation(): void {
    this.isModalVisible = false;
    this.selectedQuota = null;
    this.selectedInsured = null;
    this.reservationComment = '';
  }
}
