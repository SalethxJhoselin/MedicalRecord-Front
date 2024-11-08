// src/app/services/specialtie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
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
    this.apiUrl = `${this.apiConfigService.url}specialties`;
  }

  // Obtener lista de especialidades
  getSpecialties(): Promise<Specialty[]> {
    return lastValueFrom(this.http.get<Specialty[]>(this.apiUrl));
  }

  // Guardar una nueva especialidad
  saveSpecialty(specialty: Specialty): Promise<Specialty> {
    return lastValueFrom(this.http.post<Specialty>(this.apiUrl, specialty));
  }

  // Editar una nueva especialidad
  editSpecialty(specialty: Specialty): Promise<Specialty> {
    return lastValueFrom(this.http.put<Specialty>(`${this.apiUrl}/${specialty.id}`, specialty));
  }

  // Eliminar una especialidad
  deleteSpecialty(id: number): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
