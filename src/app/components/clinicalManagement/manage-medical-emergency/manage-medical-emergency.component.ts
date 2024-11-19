import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MedicalEmergencyService, MedicalEmergencyResponse, MedicalEmergencyDetailRequest, MedicalEmergencyRequest } from '../../../core/services/clinical-management/manage-medical-emergency.service';
import { DoctorService } from '../../../core/services/clinical-management/doctors.service';
import { InsuredService } from '../../../core/services/clinical-management/insureds.service';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-manage-medical-emergency',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './manage-medical-emergency.component.html',
  styleUrls: ['./manage-medical-emergency.component.css']
})
export class ManageMedicalEmergencyComponent implements OnInit {
  emergencies: MedicalEmergencyResponse[] = [];
  selectedEmergency!: MedicalEmergencyResponse;
  isLoading: boolean = false;
  isDetailModalOpen: boolean = false;
  isRegisterModalOpen: boolean = false;

  detail: MedicalEmergencyDetailRequest = {
    actionDescription: '',
    actionTime: '',
    performedBy: ''
  };

  // Campos para registrar emergencia médica
  selectedDoctorId: number | null = null;
  selectedInsuredId: number | null = null;
  estimatedDuration: number | null = null;
  description: string = '';

  doctors: { id: number; nombre: string }[] = [];
  insureds: { id: number; nombre: string }[] = [];

  constructor(
    private medicalEmergencyService: MedicalEmergencyService,
    private insuredService: InsuredService,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.loadEmergencies();
    this.loadData();
  }

  async loadEmergencies() {
    this.isLoading = true;
    try {
      const rawEmergencies = await this.medicalEmergencyService.getAllEmergencies();
      this.emergencies = rawEmergencies.map((emergency: any) => ({
        ...emergency,
        startTime: new Date(
          emergency.startTime[0],
          emergency.startTime[1] - 1,
          emergency.startTime[2],
          emergency.startTime[3],
          emergency.startTime[4]
        )
      }));
      console.log("Datos de emergencias:", this.emergencies);
    } catch (error) {
      console.error('Error al cargar emergencias médicas:', error);
    }
    this.isLoading = false;
  }
  async loadData() {
    try {
      // Cargar asegurados
      const insureds = await this.insuredService.getInsureds();
      this.insureds = insureds.map((insured: any) => ({
        id: insured.id,
        nombre: insured.nombre
      }));

      // Cargar doctores
      const doctors = await this.doctorService.getDoctors();
      this.doctors = doctors.map((doctor: any) => ({
        id: doctor.id,
        nombre: doctor.nombre
      }));
    } catch (error) {
      console.error('Error al cargar datos de asegurados y doctores:', error);
    }
  }

  openDetailModal(emergency: MedicalEmergencyResponse) {
    this.selectedEmergency = emergency;
    this.isDetailModalOpen = true;
  }

  closeDetailModal() {
    this.isDetailModalOpen = false;
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
  }

  async submitDetail() {
    if (!this.selectedEmergency) return;
    try {
      await this.medicalEmergencyService.addDetailToEmergency(this.selectedEmergency.id, this.detail);
      alert('Detalle de emergencia registrado exitosamente');
      this.closeDetailModal();
    } catch (error) {
      console.error('Error al registrar detalle de emergencia:', error);
    }
  }


  async registerEmergency() {
    if (!this.selectedDoctorId || !this.selectedInsuredId || !this.estimatedDuration || !this.description) {
      alert('Por favor, completa todos los campos antes de guardar.');
      return;
    }
    const currentDate = new Date();
    const formattedStartTime = formatDate(currentDate, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    const emergencyData: MedicalEmergencyRequest = {
      doctor: { id: this.selectedDoctorId },
      insured: { id: this.selectedInsuredId },
      startTime: formattedStartTime, // Fecha en el formato esperado
      estimatedDuration: this.estimatedDuration,
      description: this.description
    };

    try {
      console.log(emergencyData)
      const response = await this.medicalEmergencyService.registerEmergency(emergencyData);
      console.log('Emergencia registrada:', response);
      alert('Emergencia médica registrada exitosamente.');
      this.closeRegisterModal();
      this.loadEmergencies();
    } catch (error) {
      console.error('Error al registrar la emergencia:', error);
      alert('Hubo un error al registrar la emergencia. Por favor, inténtalo nuevamente.');
    }
  }

}
