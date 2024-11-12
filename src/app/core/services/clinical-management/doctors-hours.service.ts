import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface DoctorHour {
  person: {
    id: number;
    nombre: string;
  };
  horarios: {
    id: number;
    startTime: string;
    endTime: string;
    service: {
      id: number;
      nombre: string;
      duracion: number;
    };
    fechas: string[];
  }[];
}

export interface DoctorHourCreate {
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

  async getDoctorHours(): Promise<DoctorHour[]> {
    return await lastValueFrom(this.http.get<DoctorHour[]>(`${this.apiUrl}`));
  }

  async createDoctorHour(hourData: DoctorHourCreate): Promise<DoctorHourCreate> {
    return await lastValueFrom(this.http.post<DoctorHourCreate>(`${this.apiUrl}`, hourData));
  }
}
