import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Record {
    id?: number
    tipo?: string
    descripcion?: string
    id_asegurado?: number
}

@Injectable({
    providedIn: 'root'
})

export class RecordService {
    private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}antecedentes`;
  }

  async getRecordsByUser(id: number): Promise<Record[]>{
    return await lastValueFrom(this.http.get<Record[]>(`${this.apiUrl}/${id}`))
  }

  async deleteRecord(id:number): Promise<Record>{
    return await lastValueFrom(this.http.delete<Record>(`${this.apiUrl}/${id}`))
  }

  async createRecord(record: Record): Promise<Record>{
    return await lastValueFrom(this.http.post<Record>(this.apiUrl, record))
  }
  
}

