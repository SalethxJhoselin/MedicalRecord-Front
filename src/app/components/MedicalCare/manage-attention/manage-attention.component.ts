import { Component } from '@angular/core';
import { AttentionQuotasService } from '../../../core/services/MedicalCare/attention-quotas.service';
import { NgFor, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Doctor, DoctorService } from '../../../core/services/clinical-management/doctors.service';
import { Service, Services } from '../../../core/services/MedicalCare/services.service';

@Component({
  selector: 'app-manage-attention',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './manage-attention.component.html',
  styleUrl: './manage-attention.component.css'
})
export class ManageAttentionComponent {
confirmDelete() {
throw new Error('Method not implemented.');
}
openEditModal() {
throw new Error('Method not implemented.');
}
  reservations: any[] = [];
  reservationsFiltered: any[] = [];
  doctors: Doctor[] = [];
  services: Service[] = [];
  serviceFilter: number | null = null
  doctorFilter: number | null = null;
  dateFilter: Date | null = null;
  onWait: boolean = false;

  constructor(
    private attentionService: AttentionQuotasService,
    private doctorService: DoctorService,
    private serviceS: Services
  ) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  async loadReservations() {
    this.onWait = true;
    try {
      this.reservations = await this.attentionService.getReservations();
      this.doctors = await this.doctorService.getDoctors();
      this.services = await this.serviceS.getDates()
      console.log('Datos cargados:', { reservations: this.reservations, doctors: this.doctors });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    this.onWait = false;
  }

  applyFilters() {
    this.reservationsFiltered = this.reservations.filter((reservation) => {
      const reservationDate = new Date(
        reservation.fecha[0], // Año
        reservation.fecha[1] - 1, // Mes 
        reservation.fecha[2] // Día
      );
      const dateMatch =
        !this.dateFilter || reservationDate.toDateString() === this.dateFilter.toDateString();
      const doctorMatch =
        !this.doctorFilter || reservation.persona?.id === Number(this.doctorFilter);
      const serviceMatch =
        !this.serviceFilter || reservation.service?.id === Number(this.serviceFilter);

      return doctorMatch && dateMatch && serviceMatch;
    });
  }

  formatTime(horaReserva: number[]): string {
    if (!horaReserva || horaReserva.length !== 2) {
      return '';
    }
    const [hours, minutes] = horaReserva;
    const formattedHours = hours.toString().padStart(2, '0'); // Asegura dos dígitos
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Asegura dos dígitos
    return `${formattedHours}:${formattedMinutes}`;
  }



  clearFilters() {
    this.doctorFilter = null;
    this.dateFilter = null;
    this.serviceFilter = null;
    this.reservationsFiltered = [];
  }
}

