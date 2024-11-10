// src/app/services/doctors.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Doctor {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  direccion: string;
  especialidades: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}doctors`;
  }
  
  getDoctors(): Promise<Doctor[]> {
    return lastValueFrom(this.http.get<Doctor[]>(this.apiUrl));
  }

  createDoctor(doctorData: { personaId: number; especialidadId: number }): Promise<Doctor> {
    return lastValueFrom(this.http.post<Doctor>(`${this.apiUrl}`, doctorData));
  }

  updateSpecialtiesByDoctor(id: number,specialties: number[]): Promise<void>{
    return lastValueFrom(this.http.put<void>(`${this.apiUrl}/${id}`,{specialties}))
  }

  // Eliminar una especialidades
  deleteDoctor(id: number): Promise<Doctor> {
    return lastValueFrom(this.http.delete<Doctor>(`${this.apiUrl}/${id}`));
  }
}
