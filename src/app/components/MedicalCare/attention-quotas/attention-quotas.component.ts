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
  reservedQuotas: string[] = []; // Fichas reservadas
  isModalVisible = false;
  selectedQuota: string | null = null;
  selectedInsured: string | null = null;
  reservationDate: string = '';
  reservationStatus: string = 'Pendiente';
  reservationComment: string = '';
  selectedDate: string = '';
  selectedDoctorHour: DoctorHour | null = null;

  constructor(
    private doctorHoursService: DoctorHoursService,
    private insuredService: InsuredService,
    private attentionQuotasService: AttentionQuotasService
  ) {}

  ngOnInit(): void {
    this.loadDoctorHours();
    this.loadInsureds();
  }

  async loadDoctorHours() {
    try {
      this.doctorHours = await this.doctorHoursService.getDoctorHours();
    } catch (error) {
      console.error('Error al cargar los horarios:', error);
    }
  }

  async loadInsureds() {
    try {
      this.insuredList = await this.insuredService.getInsureds();
    } catch (error) {
      console.error('Error al cargar los asegurados:', error);
    }
  }

  formatTime(time: string): string {
    return time;
  }

  generateQuotas(hour: DoctorHour): void {
    const { startTime, endTime, service } = hour.horarios[0];
    const duration = service.duracion;

    let [currentHour, currentMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    this.selectedQuotas = [];
    this.selectedDoctorHour = hour;

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const formattedTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
      this.selectedQuotas.push(formattedTime);

      currentMinute += duration;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute %= 60;
      }
    }
  }

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
    if (!this.selectedDoctorHour || !this.selectedDoctorHour.horarios[0]) return;

    const reservationData: ReservationCreate = {
      personaId: this.selectedDoctorHour.person.id,
      serviceId: this.selectedDoctorHour.horarios[0].service.id,
      horaReserva: this.selectedQuota || '',
      fecha: this.selectedDate,
      estado: this.reservationStatus,
      comentario: this.reservationComment,
      aseguradoId: this.selectedInsured ? parseInt(this.selectedInsured) : 0,
    };

    try {
      await this.attentionQuotasService.createReservation(reservationData);
      if (this.selectedQuota) this.reservedQuotas.push(this.selectedQuota);
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

  isQuotaReserved(quota: string): boolean {
    return this.reservedQuotas.includes(quota);
  }

}
