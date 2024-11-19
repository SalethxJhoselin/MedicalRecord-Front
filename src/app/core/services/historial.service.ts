import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from './api-config.service';

// Definición del modelo basado en el DTO del controlador
export interface AttentionCompleteDTO {
  id: number;
  fecha: string;
  descripcion: string;
  medico: string;
  especialidad: string;
  // Agrega aquí más campos si son parte del DTO
}

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {
    this.apiUrl = `${this.apiConfigService.url}insured-attentions`;
  }

  // Obtener todas las atenciones completas por asegurado
  async getCompleteAttentionsByInsuredId(insuredId: number): Promise<AttentionCompleteDTO[]> {
    const url = `${this.apiUrl}/complete/${insuredId}`;
    return await lastValueFrom(this.http.get<AttentionCompleteDTO[]>(url));
  }

  // Exportar el reporte completo en PDF
  async exportCompleteAttentionReport(insuredId: number): Promise<Blob> {
    const url = `${this.apiUrl}/export/${insuredId}`;
    return await lastValueFrom(
      this.http.get(url, {
        responseType: 'blob', // Especificamos que esperamos un archivo binario (PDF)
      })
    );
  }
}
