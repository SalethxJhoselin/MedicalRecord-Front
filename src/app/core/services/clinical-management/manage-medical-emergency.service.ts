import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config.service';
import { lastValueFrom } from 'rxjs';

export interface MedicalEmergencyRequest {
  doctorId: number;
  insuredId: number;
  startTime: string;
  estimatedDuration: number;
  description: string;
}

// Interfaz de respuesta al registrar una emergencia médica
export interface MedicalEmergencyResponse {
  id: number;
  startTime: string;
  estimatedDuration: number;
  description: string;
  doctor: {
    id: number;
    nombre: string;
  };
  insured: {
    id: number;
    person: {
      nombre: string;
    };
  };
}

// Interfaz para el detalle de emergencia médica
export interface MedicalEmergencyDetailRequest {
  medicalEmergencyId: number | null; // Ahora acepta null
  actionDescription: string;
  actionTime: string;
  performedBy: string;
}

// Interfaz de respuesta del detalle de emergencia médica
export interface MedicalEmergencyDetail {
  id: number;
  actionDescription: string;
  actionTime: string;
  performedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalEmergencyService {
  private apiUrl: string;
  private detailApiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}medical-emergencies`;
    this.detailApiUrl = `${this.apiConfigService.url}medical-emergency-details`;
  }

  // Método para registrar una emergencia médica
  async registerEmergency(emergencyData: MedicalEmergencyRequest): Promise<MedicalEmergencyResponse> {
    console.log("hastaqy llega", emergencyData)
    return await lastValueFrom(this.http.post<MedicalEmergencyResponse>(`${this.apiUrl}/register`, emergencyData));
  }

  // Método para obtener todas las emergencias médicas
  async getAllEmergencies(): Promise<MedicalEmergencyResponse[]> {
    return await lastValueFrom(this.http.get<MedicalEmergencyResponse[]>(`${this.apiUrl}/all`));
  }

  // Método para obtener una emergencia médica específica por su ID
  async getEmergencyById(id: number): Promise<MedicalEmergencyResponse> {
    return await lastValueFrom(this.http.get<MedicalEmergencyResponse>(`${this.apiUrl}/${id}`));
  }

  // Método para obtener todos los detalles de emergencias médicas
  async getAllEmergencyDetails(): Promise<MedicalEmergencyDetail[]> {
    return await lastValueFrom(this.http.get<MedicalEmergencyDetail[]>(`${this.apiUrl}/details/all`));
  }

  // Método para obtener detalles de emergencia médica por ID de emergencia médica
  async getDetailsByMedicalEmergencyId(medicalEmergencyId: number): Promise<MedicalEmergencyDetail[]> {
    return await lastValueFrom(this.http.get<MedicalEmergencyDetail[]>(`${this.apiUrl}/details/${medicalEmergencyId}`));
  }

  // Método para agregar un detalle a una emergencia médica específica
  async addDetailToEmergency(detailData: MedicalEmergencyDetailRequest): Promise<MedicalEmergencyDetail> {
    return await lastValueFrom(this.http.post<MedicalEmergencyDetail>(`${this.detailApiUrl}/register`, detailData));
  }

  // Método para obtener detalles de una emergencia médica específica por su ID de emergencia
  async getDetailsByEmergencyId(emergencyId: number): Promise<MedicalEmergencyDetail[]> {
    return await lastValueFrom(this.http.get<MedicalEmergencyDetail[]>(`${this.detailApiUrl}/${emergencyId}`));
  }
}
