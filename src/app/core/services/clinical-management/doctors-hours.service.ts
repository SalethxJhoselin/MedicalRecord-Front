import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config.service';
import { lastValueFrom } from 'rxjs';

export interface DoctorHour {
  personaId: number;
  serviceId: number;
  fechas: string[];
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorHoursService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}doctor-schedule`;
  }

  // Método para obtener todos los horarios en formato DTO
  async getDoctorHours(): Promise<DoctorHour[]> {
    return await lastValueFrom(this.http.get<DoctorHour[]>(`${this.apiUrl}/dtos`));
  }

  // Método para crear un horario para un doctor con fechas
  async createDoctorHour(hourData: DoctorHour): Promise<DoctorHour> {
    return await lastValueFrom(this.http.post<DoctorHour>(`${this.apiUrl}/save-with-dates`, hourData));
  }
}