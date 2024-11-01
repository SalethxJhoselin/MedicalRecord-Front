// src/app/services/specialtie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Specialty {
  id?: number; 
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpecialtieService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.railwayUrl}specialties`;
  }

  // Obtener lista de especialidades
  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.apiUrl);
  }

  // Guardar una nueva especialidad
  saveSpecialty(specialty: Specialty): Observable<Specialty> {
    return this.http.post<Specialty>(this.apiUrl, specialty);
  }

  // Eliminar una especialidad
  deleteSpecialty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
