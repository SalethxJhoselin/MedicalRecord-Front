import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config.service';
import { lastValueFrom } from 'rxjs';

export interface ReservationCreate {
  personaId: number;
  serviceId: number;
  horaReserva: string;
  fecha: string;
  estado: string;
  comentario: string;
  aseguradoId: number;
}
@Injectable({
  providedIn: 'root'
})
export class AttentionQuotasService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}reservas`;
  }

  async createReservation(reservationData: ReservationCreate): Promise<ReservationCreate> {
    return await lastValueFrom(this.http.post<ReservationCreate>(this.apiUrl, reservationData));
  }
}