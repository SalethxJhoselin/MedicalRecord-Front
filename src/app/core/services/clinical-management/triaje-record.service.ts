import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config.service';
import { lastValueFrom } from 'rxjs';

export interface TriageRequest {
  fechaTriaje: string;
  presionArterial: string;
  frecuenciaCardiaca: number;
  temperatura: number;
  oxigeno: number;
  sintomas: string;
  comentario: string;
  prioridad: number;
}

export interface TriageResponse {
  id: number;
  fechaTriaje: string;
  presionArterial: string;
  frecuenciaCardiaca: number;
  temperatura: number;
  oxigeno: number;
  sintomas: string;
  comentario: string;
  prioridad: number;
}

@Injectable({
  providedIn: 'root'
})
export class TriajeRecordService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}triaje`;
  }

  // Crear un nuevo registro de triaje
  async createTriage(triageData: TriageRequest): Promise<TriageResponse> {
    return await lastValueFrom(this.http.post<TriageResponse>(this.apiUrl, triageData));
  }

  // Obtener un triaje específico por su ID
  async getTriage(id: number): Promise<TriageResponse> {
    return await lastValueFrom(this.http.get<TriageResponse>(`${this.apiUrl}/${id}`));
  }

  // Obtener todos los registros de triaje
  async getAllTriages(): Promise<TriageResponse[]> {
    return await lastValueFrom(this.http.get<TriageResponse[]>(this.apiUrl));
  }
}
