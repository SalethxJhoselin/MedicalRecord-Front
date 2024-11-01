// src/app/services/doctors.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Doctor {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  direccion: string;
  especialidad: string;
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
    this.apiUrl = `${this.apiConfigService.railwayUrl}doctors`;
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  createDoctor(doctorData: { personaId: number; especialidadId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, doctorData);
  }

  // Eliminar una especialidad
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
