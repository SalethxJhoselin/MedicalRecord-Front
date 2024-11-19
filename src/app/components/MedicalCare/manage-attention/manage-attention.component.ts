import { Component } from '@angular/core';
import { AttentionQuotasService } from '../../../core/services/MedicalCare/attention-quotas.service';
import { NgFor, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Doctor, DoctorService } from '../../../core/services/clinical-management/doctors.service';
import { Service, Services } from '../../../core/services/MedicalCare/services.service';
import { AtencionCreate, AtencionService } from '../../../core/services/MedicalCare/atencion.service';
import { TratamientoCreate, TratamientoService } from '../../../core/services/MedicalCare/tratamiento.service';
import { LaboratorioCreate, LaboratorioService } from '../../../core/services/MedicalCare/laboratorio.service';

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
  reservations: any[] = [];
  reserva: any = {}
  reservationsFiltered: any[] = [];
  doctors: Doctor[] = [];
  services: Service[] = [];
  serviceFilter: number | null = null
  doctorFilter: number | null = null;
  dateFilter: Date | null = null;
  onWait: boolean = false;

  isEditModalOpen: boolean = false;
  activeTab: number = 0;
  modalSections: string[] = ['Farmacia', 'Laboratorio', 'Tratamiento', 'Atencion Médica', 'Historia Clínica'];

  selectReserva: number | null = null
  selectAtencion: number | null = null
  consulta: any = {}
  newConsulta: AtencionCreate | null = null
  newLaboratorio: LaboratorioCreate = {}
  newTratamiento: TratamientoCreate = {}
  tratamientos: any[] = []
  laboratorios: any[] = []

  newMedicamento = {
    nombre: '',
    dosis: '',
    frecuencia: '',
    duracion: '',
    instrucciones: ''
  };
  
  medicamentos = [];

  newExamen = {
    tipo: '',
    fecha: '',
    resultados: '',
    observaciones: '',
    estado: ''
  };
  
  altaMedica = {
    motivoConsulta: '',
    diagnostico: '',
    recomendaciones: '',
    estado: ''
  };


  constructor(
    private attentionService: AttentionQuotasService,
    private doctorService: DoctorService,
    private serviceS: Services,
    private consultaService: AtencionService,
    private tratamientoService: TratamientoService,
    private laboratorioService: LaboratorioService
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

  async loadAtencion(){
    if (this.selectReserva != null) {
      this.onWait = true;
      try {
        this.consulta = await this.consultaService.getAtencionByReserva(this.selectReserva)
        this.selectAtencion = this.consulta.id
        if (this.selectAtencion != null) {
          this.tratamientos = await this.tratamientoService.getTratamientosByAtencion(this.selectAtencion)
          this.laboratorios = await this.laboratorioService.getLaboratorioByAtencion(this.selectAtencion)
        }
        console.log(this.consulta)
        console.log(this.laboratorios)
        console.log(this.tratamientos)
      } catch (error) {
        
      }
      this.onWait = false;
    }
  }

  async createTratamiento(){
    if (this.selectAtencion != null) {
      try {
        this.newTratamiento.id_atencion = this.selectAtencion
        console.log(this.newTratamiento)
        await this.tratamientoService.createTratamiento(this.newTratamiento)
        this.tratamientos.push(this.newTratamiento)
      } catch (error) {
        
      }
    }
  } 

  async createLaboratorio(){
    if (this.selectAtencion != null) {
      try {
        this.newLaboratorio.id_atencion = this.selectAtencion
        console.log(this.newLaboratorio)
        await this.laboratorioService.createLaboratorio(this.newLaboratorio)
        this.laboratorios.push(this.newLaboratorio)
      } catch (error) {
        
      }
    }
  }

  async updateConsulta(){
    try {
      console.log(this.consulta)
      await this.consultaService.updateAtencion(this.consulta)
    } catch (error) {
      
    }
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


  openEditModal(reserva: any) {
    this.selectReserva = reserva.id
    this.loadAtencion()
    this.reserva = reserva
    this.isEditModalOpen = true;
    this.activeTab = 0;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  selectTab(index: number) {
    this.activeTab = index;
  }
}

