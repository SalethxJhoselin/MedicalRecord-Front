import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface AtencionCreate{
    fecha_atencion:Date,
    hora_atencion:Date,
    motivo_consulta:String,
    recomendaciones:String,
    diagnostico:String,
    estado:String,
    id_triaje:number
}

@Injectable({
    providedIn: 'root'
})

export class AtencionService {
    private apiUrl: string;

    constructor(
        private http: HttpClient,
        private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${this.apiConfigService.url}attentions`;
    }

    async getAllAtenciones(): Promise<any[]>{
        return lastValueFrom(this.http.get<any[]>(this.apiUrl));
    }

    async getAtencionById(id:number): Promise<any>{
        return lastValueFrom(this.http.get<any>(`${this.apiUrl}/attention/${id}`));
    }

    async getAtencionByTriaje(id:number): Promise<any>{
        return lastValueFrom(this.http.get<any>(`${this.apiUrl}/triage/${id}`));
    }

    async getAtencionByReserva(id:number): Promise<any>{
        return lastValueFrom(this.http.get<any>(`${this.apiUrl}/reserva/${id}`));
    }

    async createAtencion(atencion:any): Promise<any>{
        return lastValueFrom(this.http.post<any>(this.apiUrl,atencion))
    }

    async updateAtencion(atencion:any): Promise<any>{
        return lastValueFrom(this.http.put<any>(this.apiUrl,atencion))
    }

}