// src/app/services/users/bitacora.service.ts
import { format } from 'date-fns';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Bitacora {
  id?: number;
  ip?: String;
  usuario: String;
  fecha: Date;
  hora: Date;
  accion: String;
  tablaAfectada: String;
}

export interface BitacoraPost {
  ip?: String;
  usuario: String;
  fecha: String;
  hora: String;
  accion: String;
  tablaAfectada: String;
}

export interface Ip{
  ip?: String
}

@Injectable({
  providedIn: 'root'
})

export class BitacoraService {
  private apiUrl: string;
  private iP: string;
  ip: Ip = {}

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}bitacora`;
    this.iP = 'https://api64.ipify.org?format=json';
  }

  async getDates(): Promise<Bitacora[]> {
    return await lastValueFrom(this.http.get<Bitacora[]>(this.apiUrl))
  }

  async createBitacora(date: BitacoraPost): Promise<BitacoraPost> {
    try {
      return await lastValueFrom(this.http.post<BitacoraPost>(this.apiUrl, date));
    } catch (error) {
      console.error("Error al agregar la bitácora:", error);
      throw error;
    }
  }

  async addBitacoraEntry(action: string, table: string) {
    this.ip = await this.getIp();
    const currentDate = new Date();

    const fecha = format(currentDate, 'yyyy-MM-dd');
    const hora = format(currentDate, 'HH:mm:ss');

    const bitacoraEntry: BitacoraPost = {
      ip: this.ip.ip,
      usuario: localStorage.getItem('user') || 'Usuario desconocido',
      fecha: fecha,
      hora: hora,
      accion: action,
      tablaAfectada: table
    };

    try {
      console.log(bitacoraEntry)
      await this.createBitacora(bitacoraEntry);
      console.log(`Registro de bitácora añadido: ${action} en ${table}`);
    } catch (error) {
      console.error("Error al agregar a la bitácora:", error);
    }
  }
  

  async getIp(): Promise<Ip>{
    return await lastValueFrom(this.http.get<Ip>(this.iP))
  }
}