// src/app/services/users/bitacora.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Bitacora{
    id: number;
    ip: String;
    usuario: String;
    fecha: Date;
    hora: Date;
    accion: String;
    tablaAfectada: String;
}

@Injectable({
    providedIn: 'root'
})

export class BitacoraService{
    private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}bitacora`;
  }

  async getDates(): Promise<Bitacora[]>{
    return await lastValueFrom(this.http.get<Bitacora[]>(this.apiUrl))
  }
}