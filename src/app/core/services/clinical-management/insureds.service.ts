import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface InsuredGet {
  id?: number
  id_usuario?: number
  usuario?: string
  nombre?: string
  email?: string
  fecha_nacimiento?: Date
  direccion?: string
  telefono?: string
}

export interface InsuredPost{
  fecha?: Date //fecha de nacimiento
  telefono?: String
  id_person?: number
}

export interface Insured {
  fecha: Date
  telefono: string
  id_person: number
}

@Injectable({
  providedIn: 'root'
})

export class InsuredService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}insureds`;
  }

  async getInsureds(): Promise<InsuredGet[]> {
    return await lastValueFrom(this.http.get<InsuredGet[]>(this.apiUrl))
  }

  async getInsuredById(id: number): Promise<InsuredGet> {
    return await lastValueFrom(this.http.get<InsuredGet>(`${this.apiUrl}/${id}`));
  }

  async createInsured(insured: InsuredPost): Promise<InsuredPost>{
    return await lastValueFrom(this.http.post<InsuredPost>(this.apiUrl, insured))
  }
  async deleteInsured(id: number): Promise<InsuredPost>{
    return await lastValueFrom(this.http.delete<InsuredPost>(`${this.apiUrl}/${id}`))
  }

  async updateInsured(insured: InsuredGet): Promise<InsuredGet>{
    return await lastValueFrom(this.http.put<InsuredGet>(this.apiUrl, insured))
  }

  

}

