import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../core/services/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}api/estadisticas`;
  }

  async getAtencionesPorMes(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/atenciones-mes`));
  }

  async getAtencionesPorMedico(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/atenciones-medico`));
  }

  async getServiciosMasSolicitados(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/servicios-solicitados`));
  }

  async getAtencionesPorEstado(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/atenciones-estado`));
  }
}
