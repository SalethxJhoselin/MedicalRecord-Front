import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface LaboratorioCreate{
    tipo_examen?:String,
    fecha_examen?:Date,
    observaciones?:String,
    resultados?:String,
    estado?:String,
    id_atencion?:number
}

@Injectable({
    providedIn: 'root'
})

export class LaboratorioService {
    private apiUrl: string;

    constructor(
        private http: HttpClient,
        private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${this.apiConfigService.url}laboratorios`;
    }

    async getAllLaboratorios(): Promise<any[]>{
        return lastValueFrom(this.http.get<any[]>(this.apiUrl));
    }

    async getLaboratorioByAtencion(id:number): Promise<any[]>{
        return lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/atencion/${id}`));
    }

    async createLaboratorio(tratamiento:LaboratorioCreate): Promise<LaboratorioCreate>{
        return lastValueFrom(this.http.post<LaboratorioCreate>(this.apiUrl,tratamiento))
    }

    async generateReport(): Promise<Blob> {
        return lastValueFrom(this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' }));
    }

}